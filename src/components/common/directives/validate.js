import Vue from 'vue';
import injector from 'vue-inject'
//https://vuejs.org/v2/guide/custom-directive.html
//Dealing with events
//https://weblog.west-wind.com/posts/2010/May/27/NonDom-Element-Event-Binding-with-jQuery

//v-validate="{model:model, property:'sendDate'}"
export default function validate() {
  return {
    bind: bind,
	  inserted: function(el,binding,vnode) {},
	  update: function(el,binding,vnode,oldVnode) {},
    componentUpdated: componentUpdated,
	  unbind: function(el,binding,vnode){}
  }
}

var bind = injector.encase(['$'],
  $ =>
    (el, binding, vnode) => {
      //console.log(binding.value.model.sendDate);
    //console.log(binding.value);
  }
);
var componentUpdated = injector.encase(['$'],
  $ =>
  (el, binding, vnode, oldVnode) => {
    
    const targetProperty = binding.value.model.property || el.id;
    
    $(binding.value.model).bind("validate", function () {
      $(el).remove(".invalid-feedback");
      
      const error = binding.value.error || `${targetProperty} is required.`;
      const errMsg = `${targetProperty} is required`;

      if (!binding.value.model.errors) {
        binding.value.model.errors = [];
      }

      if (binding.value.model.errors.indexOf(errMsg) > -1) {
        binding.value.model.errors.splice(binding.value.model.errors.indexOf(errMsg), 1);
      }

      const target = $(el).attr("type") === "text" ? el : $(el).find("input[type='text']")[0];
      $(target).on("change", function() {
        if ($(this).val()) {
          target.setCustomValidity("");
        }
      });
      target.setCustomValidity("");
      
      $(target)
        .parent()
        .find(".invalid-feedback")
        .remove();

      const form = $(el).closest("form");
      form.removeClass("needs-validation");
      form.addClass("was-validated");
      
     
      if (!binding.value.model[targetProperty]) {
       
       
        if (binding.value.model.errors.indexOf(errMsg) === -1) {
          binding.value.model.errors.push(errMsg);
        }
        target.setCustomValidity("invalid");
        
        $(target)
          .parent()
          .append($(`
              <div class="invalid-feedback">
                ${error}
              </div>
          `));

       

      }
    });

   
  }
);

Vue.directive('validate', validate());
