/*
Create tmp table to list all applicable status for MassMail request

*/

WITH cte_result as (
  select r.usermessageId id,
  case 
	when PendingEmployees = 1 then 'Pending Employees' end col1,
    case when PendingStudents = 1 then 'Pending Students' end col2,
	case when ApprovedEmployees =1 then 'Approved Employees' end col3,
	case when ApprovedStudents =1 then 'Approved Students' end col4,
	case when SentEmployees =1 then 'Sent to Employees' end col5,
	case when SentStudents =1 then 'Sent to Students' end col6,
	case when Canceled =1 then 'Canceled' end col7,
	case when DeniedEmployees =1 then 'Denied Employees' end col8,
	case when DeniedStudents =1 then 'Denied Students' end col9
  from MessageStatus ms
  join requests r on r.GuidMessageId = ms.GuidMessageId
  where 1=1 )
select id, 
  status
  into #tmp
from cte_result
  cross apply
  (
    select col1 union all
    select col2 union all
    select col3 union all
    select col4 union all
    select col5 union all
    select col6 union all
    select col7 union all
    select col8 union all
    select col9
  ) c (status);



  /*
Create JSON dataset, stripping invalid characters, also converting the status records into a comma delimited list

*/





 SELECT 
 r.UserMessageId id,
 REPLACE(REPLACE(r.Subject, CHAR(13) + CHAR(11), ''), '&', '&amp;') subject, 
 r.RequestorOnyen author,
 sc.SendDate sendDate, 
 sc.ExpireDate expirationDate,
  r.Priority priority,
 r.[from] sendFrom,
 r.ReplyTo replyTo,
 LTRIM(RTRIM(
 replace(
 replace(
 REPLACE(REPLACE(r.MessageText, CHAR(13) + CHAR(11), ''), '&', '&amp;')
 , '<', '&lt;')
 , '>', '&gt;')
 )
 ) content,
  LTRIM(RTRIM(REPLACE(REPLACE(r.Comments, CHAR(13) + CHAR(11), ''), '&', '&amp;'))) comments,
  REPLACE(REPLACE(r.SponsoringOrganization, CHAR(13) + CHAR(11), ''), '&', '&amp;') sponsoringUniversity,
 sc.ModDate changeDate,
 (
 SELECT
   DISTINCT  
    STUFF((
        SELECT ',' + t.status
        FROM #tmp t
        WHERE t.id = r.UserMessageId
        AND t.status IS NOT NULL
        FOR XML PATH('')
    ),1,1,'') AS statusList
FROM #tmp
GROUP BY status

 ) status
 into #tmp2
  FROM [ITS_WSAPP_MASSMAIL].[dbo].[MessageStatus] ms 
  JOIN requests r ON r.GuidMessageId = ms.GuidMessageId
  JOIN SendingCriteria sc ON sc.GuidMessageId = r.GuidMessageId
  

  WHERE  r.UserMessageId  = r.UserMessageId 
  --and r.usermessageid = 4626
   ORDER BY 		sc.SendDate DESC
   
  --FOR JSON PATH, INCLUDE_NULL_VALUES;

  



select 
--SUBSTRING(t.content, 0,10) content
t.*
 from #tmp2 t
order by SendDate desc
offset 0 rows
fetch next 423 rows only
FOR JSON PATH, INCLUDE_NULL_VALUES;


--Cleanup
drop table #tmp;     
drop table #tmp2;
