
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

//this doesn't work
//window.CKEDITOR_BASEPATH ='./node_modules/ckeditor/'
window.CKEDITOR_BASEPATH = '//cdn.ckeditor.com/4.9.2/full/';
window.CKEDITOR_BASEPATH = '//cdn.ckeditor.com/4.9.2/standard-all/';
window.CKEDITOR_BASEPATH = '//cdn.ckeditor.com/4.9.2/full-all/';

//http://cdn.ckeditor.com/4.5.11/full-all/plugins/divarea/plugin.js

require('ckeditor/ckeditor');



@Component({
  name: '',
  dependencies: ['$','massMailService']
})
export default class MessageContents extends Vue {
  model = {};
  ckEditorInstance = null;

  loadEditor() {

    return new Promise((resolve) => {
      setTimeout(() => {
          this.ckEditorInstance = CKEDITOR.replace('editor1',
            {
              //Remove plugins for this iteration
              //extraPlugins: 'divarea,uploadimage',
              //imageUploadUrl: '/uploader/upload.php?type=Images'
            });

          resolve();
        },
        100);
    });
  }

  onTextChanged(e) {

    this.model.content = e.editor.getData();
    

  }
  beforeDestroy() {
    this.ckEditorInstance.removeAllListeners();
    CKEDITOR.remove(this.ckEditorInstance);
    
  }
  
  addDefaultImageHandlingTest() {
    CKEDITOR.replace('editor1',
      {
        //Remove plugins for this iteration
        //extraPlugins: 'uploadimage',
        //This is temporary till we get an API setup
        //imageUploadUrl: '/uploader/upload.php?type=Images'
        

      });


  }
  onFileUploadRequest(evt) {

    evt.stop();
  }

  addCkEditorEventHandling() {
    CKEDITOR.instances.editor1.on('change', this.onTextChanged);
    CKEDITOR.instances.editor1.on('fileUploadRequest', this.onFileUploadRequest);
  }

  mounted() {

    this.loadEditor().then(() => {
      this.addCkEditorEventHandling();
    });
    
    this.model = this.massMailService.model;
    
  }

}

