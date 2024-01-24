!function(){"use strict";var e={n:function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,{a:a}),a},d:function(t,a){for(var n in a)e.o(a,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:a[n]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.element,a=window.React,n=e.n(a),l=window.ReactDOM,r=e.n(l),i=window.wp.components;class s extends a.Component{constructor(e){super(e)}state={};render(){return(0,t.createElement)("div",{className:"t-center",style:{padding:10}},(0,t.createElement)(i.Spinner,null),(0,t.createElement)("p",null,(0,t.createElement)("strong",null,"Loading...")))}}var o=s;class c extends a.Component{constructor(e){super(e),this.state={showModal:!1,closeModal:!1,search:"",addressBook:[],isLoading:!0,isLoadingNew:!1,scrolledToBottom:!1,defaultPage:1,nextPageisAvailable:!1}}componentDidMount(){}componentWillUnmount(){}getAddressBook=()=>{jQuery(document).ready((e=>{e.ajax({type:"GET",url:terminal_africa.ajax_url,data:{action:"terminal_africa_get_address_book",nonce:terminal_africa.nonce,page:this.state.defaultPage,search:this.state.search},dataType:"json",beforeSend:()=>{""!==this.state.search?this.setState({isLoading:!0}):this.setState({isLoadingNew:!0})},success:e=>{var t=e.data.pagination.hasNextPage;t=Boolean(t),200===e.code?(""!==this.state.search&&this.setState({addressBook:[]}),this.setState({addressBook:[...this.state.addressBook,...e.data.addresses],isLoading:!1,isLoadingNew:!1,nextPageisAvailable:t})):this.setState({isLoading:!1,nextPageisAvailable:!1,isLoadingNew:!1})},error:(e,t,a)=>{try{wp.data.dispatch("core/notices").createNotice("success","Error: "+e.responseText,{type:"snackbar",isDismissible:!0})}catch(a){}}})}))};handleScroll=e=>{const t=e.target;var a=t.scrollTop+t.clientHeight;(a=Math.ceil(a))>=t.scrollHeight?(this.setState({scrolledToBottom:!0,defaultPage:this.state.defaultPage+1}),this.state.nextPageisAvailable&&this.getAddressBook()):this.setState({scrolledToBottom:!1})};showModal=e=>{e.preventDefault(),this.setState({showModal:!0}),this.getAddressBook()};closeModal=()=>{this.setState({showModal:!1})};handleChange=e=>{this.setState({search:e,defaultPage:1}),""!==e&&this.getAddressBook()};handleItemClick=e=>{e.preventDefault();var t=e.currentTarget.getAttribute("data-address-id"),a=this.state.addressBook.find((e=>e.address_id===t));if(a)jQuery(document).ready((e=>{const t=e(".t-body");if(t.find('input[name="first_name"]').val(a.first_name),t.find("#t_first_name").text(a.first_name),t.find('input[name="last_name"]').val(a.last_name),t.find("#t_last_name").text(a.last_name),t.find('input[name="email"]').val(a.email),t.find("#t_email").text(a.email),t.find('input[name="phone"]').val(a.phone),t.find("#t_phone").text(a.phone),t.find('input[name="line_1"]').val(a.line1),t.find("#t_address").text(a.line1+" "+a.line2),t.find('input[name="line_2"]').val(a.line2),t.find('input[name="zip_code"]').val(a.zip),t.find('input[name="address_id"]').length)t.find('input[name="address_id"]').val(a.address_id);else{var n=e("<input>").attr("type","hidden").attr("name","address_id").val(a.address_id);t.find("form").append(e(n))}t.find('input[name="zip_code"]').val(a.zip),this.closeModal(),t.find('select[name="lga"] option').remove().trigger("select2.change");const l=t.find('select[name="country"]');l.val(a.country),e(".t-phone-new-select").length&&(console.log(a),e(".t-phone-new-select option[data-isocode="+a.country+"]").prop("selected",!0).trigger("change")),l.trigger("change")}));else try{wp.data.dispatch("core/notices").createNotice("success","Address not found",{type:"snackbar",isDismissible:!0})}catch(e){}};render(){let{showModal:e,search:a,isLoading:n,addressBook:l,scrolledToBottom:r,isLoadingNew:s}=this.state;return(0,t.createElement)(t.Fragment,null,e&&(0,t.createElement)(i.Modal,{title:"Terminal Address Book",onRequestClose:this.closeModal},(0,t.createElement)("div",{className:"t-phonebook-modal"},(0,t.createElement)("div",{className:"t-phonebook-area"},(0,t.createElement)("div",{className:"t-input-container"},(0,t.createElement)(i.SearchControl,{label:"Search Address Book",placeholder:"Search Address Book",className:"t-phonebook-search",value:a,onChange:e=>this.handleChange(e)})),(0,t.createElement)("div",{className:"t-scroll-area"},(0,t.createElement)(i.__experimentalScrollable,{style:{maxHeight:200},smoothScroll:!0,onScroll:this.handleScroll,className:"t-scroll-area-div"},(0,t.createElement)("div",{style:{maxHeight:500}},n?(0,t.createElement)(o,null):(0,t.createElement)(t.Fragment,null,(0,t.createElement)(i.__experimentalItemGroup,null,l.map(((e,a)=>(0,t.createElement)(i.__experimentalItem,{key:a,className:"t-phonebook-item","data-address-id":e.address_id,onClick:this.handleItemClick},(0,t.createElement)("div",{className:"t-phonebook-item-content"},(0,t.createElement)("div",{className:"t-phonebook-item-name"},e.first_name," ",e.last_name),(0,t.createElement)("div",{className:"t-phonebook-item-sub"},e.city,", ",e.state,", ",e.country),(0,t.createElement)("div",{className:"t-phonebook-item-phone"},e.line1)))))),r&&(0,t.createElement)("div",{className:"t-phonebook-scrolled-to-bottom-message"},s?(0,t.createElement)(o,null):(0,t.createElement)(t.Fragment,null,"You've reached the end of the list."))))))))),(0,t.createElement)("button",{className:"t-manage-shipping-button",onClick:this.showModal},(0,t.createElement)("img",{src:terminal_africa.plugin_url+"/img/phone-book.svg",alt:"Phone Book"}),"Import Address"))}}var m=c;class d extends a.Component{render(){const{className:e,title:a}=this.props;return(0,t.createElement)("div",{className:"t-status-list "+e,style:{width:"fit-content"}},a)}}class p extends a.Component{constructor(e){super(e),this.state={}}copyShippingIdToClipboard=()=>{navigator.clipboard.writeText(this.props?.shippingData?.shipping_id),iziToast.show({title:"Copied",message:"Shipping ID copied to clipboard",theme:"dark",position:"topRight",progressBarColor:"rgb(246 146 32)",transitionIn:"flipInX",transitionOut:"flipOutX"})};render(){const{shippingData:e,shippingStatus:n}=this.props;return(0,t.createElement)(a.Fragment,null,(0,t.createElement)("div",{className:"t-shipment-header t-flex"},(0,t.createElement)("div",null,(0,t.createElement)("div",{onClick:this.copyShippingIdToClipboard,className:"t-flex",style:{cursor:"pointer"},"data-shipping-id":e?.shipping_id},(0,t.createElement)("h1",null,e?.shipping_id),(0,t.createElement)("img",{src:terminal_africa.plugin_url+"/img/copy-icon.svg",alt:"Terminal Copy Icon"})),(0,t.createElement)("div",{className:"t-flex t-button-phonebook-mobile"},(0,t.createElement)(d,{className:n.className,title:n.title}),(0,t.createElement)("div",{className:"t-button-phonebook-mobile-inner"},(0,t.createElement)(m,null)))),(0,t.createElement)("div",{className:"t-flex t-button-phonebook"},(0,t.createElement)(m,null))))}}class g extends a.Component{constructor(e){super(e),this.state={}}gotoWCOrder=()=>{try{jQuery.blockUI({message:"Redirecting to WC Order...",css:{border:"none",padding:"15px",backgroundColor:"#000",opacity:.5,color:"#fff"},overlayCSS:{backgroundColor:"#fff",opacity:.6}}),window.location.href=this.props.shippingData.order_url}catch(e){jQuery.unblockUI()}};gotoTracking=()=>{const{shippingData:e}=this.props,t=terminal_africa.tracking_url+e.shipping_id;window.open(t,"_blank").focus()};render(){const{shippingData:e,shippingTrackingNumber:n}=this.props;return(0,t.createElement)(a.Fragment,null,(0,t.createElement)("div",{style:{padding:"0px 30px"}},(0,t.createElement)("div",{className:"t-shipping-side"},(0,t.createElement)("div",{className:"t-flex t-flex t-mb-2"},(0,t.createElement)("h3",null,"Manage Order"),(0,t.createElement)("button",{className:"t-manage-shipping-button",onClick:this.gotoTracking},"Track"," ",(0,t.createElement)("img",{src:terminal_africa.plugin_url+"/img/arrow-forward-new.svg",alt:"Track Shipment",style:{marginLeft:10}}))),(0,t.createElement)("div",{className:"t-flex"},(0,t.createElement)("h4",null,"Order Date"),(0,t.createElement)("p",null,e.order_date)),(0,t.createElement)("div",{className:"t-flex"},(0,t.createElement)("h4",null,"Order Number"),(0,t.createElement)("p",null,"#",e.order_id)),(0,t.createElement)("div",{className:"t-flex",style:{marginTop:10}},(0,t.createElement)("a",{href:"javascript:;",onClick:this.gotoWCOrder,className:"t-btn t-btn-primary t-btn-sm",style:{padding:"14px",borderRadius:"13px"}},"Manage in WC Editor"))),(0,t.createElement)("div",{className:"t-shipping-side",style:{marginTop:40}},(0,t.createElement)("div",{className:"t-flex t-flex t-mb-2"},(0,t.createElement)("h3",null,"Manage Shipping")),(0,t.createElement)("div",{className:"t-flex"},(0,t.createElement)("h4",{style:{marginRight:"25%"}},"Carrier"),(0,t.createElement)("div",{className:"t-flex"},(0,t.createElement)("img",{src:e?.saved_others?.carrier_logo,alt:"Carrier Logo",style:{height:15,marginBottom:8,marginRight:5}}),(0,t.createElement)("p",null,e?.saved_others?.carrier_name," ",e?.saved_others?.carrier_rate_description))),(0,t.createElement)("div",{className:"t-flex"},(0,t.createElement)("h4",null,"Tracking Number"),(0,t.createElement)("p",{className:"t-new-tracking-number"},n)),(0,t.createElement)("div",{className:"t-flex"},(0,t.createElement)("h4",null,"Shipping price"),(0,t.createElement)("p",{dangerouslySetInnerHTML:{__html:e.shipping_price}})),(0,t.createElement)("div",{style:{marginTop:13},id:"t_carriers_location"}))))}}class h extends n().Component{constructor(e){super(e),this.state={saved_address:{}}}componentDidMount(){}componentDidUpdate(e){this.props.shippingData!==e.shippingData&&this.props.shippingData&&(this.loadSelect2(),this.initFormSelectEvent()),this.props.saved_address!==e.saved_address&&this.props.saved_address&&this.setState({saved_address:this.props.saved_address})}loadSelect2(){try{jQuery(document).ready((function(e){let t=t=>t.id?e("<span>"+t.element.dataset.flag+" "+t.text+"</span>"):t.text,a=t=>t.id?(t.text.includes("+")||(t.text="+"+t.text),e("<span>"+t.element.dataset.flag+" "+t.text+"</span>")):t.text;e(".t-terminal-country").select2({placeholder:"Select",allowClear:!0,width:"100%",dropdownCssClass:"t-form-control",dropdownParent:e(".t-terminal-country").parent(),templateResult:t,templateSelection:t}),e(".terminal-state").select2({placeholder:"Select",allowClear:!0,width:"100%",dropdownCssClass:"t-form-control",dropdownParent:e(".terminal-state").parent()}),e(".terminal-city").select2({placeholder:"Select city",allowClear:!0,width:"100%",dropdownCssClass:"t-form-control",dropdownParent:e(".terminal-city").parent()}),e(".t-phone-new-select").select2({placeholder:"Select",allowClear:!1,width:"100%",dropdownCssClass:"t-form-control",dropdownParent:e(".t-phone-new-select").parent(),templateResult:a,templateSelection:a})})),this.formSubmitEvent()}catch(e){console.log(e)}}initFormSelectEvent=()=>{jQuery(document).ready((function(e){e(".t-terminal-country").change((function(t){t.preventDefault();var a=e(this).val();a&&e.ajax({type:"GET",url:terminal_africa.ajax_url,data:{action:"terminal_africa_get_states",countryCode:a,nonce:terminal_africa.nonce},dataType:"json",beforeSend:function(){Swal.fire({title:"Processing...",text:"Please wait...",imageUrl:terminal_africa.plugin_url+"/img/loader.gif",allowOutsideClick:!1,allowEscapeKey:!1,allowEnterKey:!1,showConfirmButton:!1,footer:`\n              <div>\n                <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">\n              </div>\n            `})},success:function(t){Swal.close(),200==t.code?(e(".t-terminal-state").select2("destroy"),e(".t-terminal-state").find("option").remove(),e(".t-terminal-state").append("<option value=''>Select State</option>"),e.each(t.states,(function(t,a){e(".t-terminal-state").append("<option value='"+a.name+"' data-statecode='"+a.isoCode+"'>"+a.name+"</option>")})),e(".t-terminal-state").select2({placeholder:"Select state",allowClear:!0,width:"100%",dropdownCssClass:"t-form-control",dropdownParent:e(".t-terminal-state").parent()})):(e(".t-terminal-state").select2("destroy"),e(".t-terminal-state").find("option").remove(),e(".t-terminal-state").append("<option value=''>Select State</option>"),e(".t-terminal-state").select2({placeholder:"Select state",allowClear:!0,width:"100%",dropdownCssClass:"t-form-control",dropdownParent:e(".t-terminal-state").parent()}),Swal.fire({icon:"error",title:"Oops...",text:t.message,confirmButtonColor:"rgb(246 146 32)",cancelButtonColor:"rgb(0 0 0)",footer:`\n                <div>\n                  <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">\n                </div>\n              `}))},error:function(e,t,a){Swal.close(),Swal.fire({icon:"error",title:"Oops...",text:"Something went wrong!: "+e.responseText,confirmButtonColor:"rgb(246 146 32)",cancelButtonColor:"rgb(0 0 0)",footer:`\n              <div>\n                <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">\n              </div>\n            `})}})})),e(".t-terminal-state").select2({placeholder:"Select Sate",allowClear:!0,width:"100%",dropdownCssClass:"t-form-control",dropdownParent:e(".t-terminal-state").parent()}),e(".t-terminal-state").change((function(t){t.preventDefault();var a=e(this).find("option:selected").data("statecode"),n=e(".t-terminal-country").val();n?a&&n?e.ajax({type:"GET",url:terminal_africa.ajax_url,data:{action:"terminal_africa_get_cities",stateCode:a,countryCode:n,nonce:terminal_africa.nonce},dataType:"json",beforeSend:function(){Swal.fire({title:"Processing...",text:"Please wait...",imageUrl:terminal_africa.plugin_url+"/img/loader.gif",allowOutsideClick:!1,allowEscapeKey:!1,allowEnterKey:!1,showConfirmButton:!1,footer:`\n              <div>\n                <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">\n              </div>\n            `})},success:function(t){Swal.close(),200==t.code?(e(".t-terminal-city").select2("destroy"),e(".t-terminal-city").find("option").remove(),e(".t-terminal-city").append("<option value=''>Select City</option>"),e.each(t.cities,(function(t,a){e(".t-terminal-city").append("<option value='"+a.name+"'>"+a.name+"</option>")})),e(".t-terminal-city").select2({placeholder:"Select city",allowClear:!0,width:"100%",dropdownCssClass:"t-form-control",dropdownParent:e(".t-terminal-city").parent()})):(e(".t-terminal-city").select2("destroy"),e(".t-terminal-city").find("option").remove(),e(".t-terminal-city").append("<option value=''>Select City</option>"),e(".t-terminal-city").select2({placeholder:"Select city",allowClear:!0,width:"100%",dropdownCssClass:"t-form-control",dropdownParent:e(".t-terminal-city").parent()}),Swal.fire({icon:"error",title:"Oops...",text:t.message,confirmButtonColor:"rgb(246 146 32)",cancelButtonColor:"rgb(0 0 0)",footer:`\n                <div>\n                  <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">\n                </div>\n              `}))},error:function(e,t,a){Swal.close(),Swal.fire({icon:"error",title:"Oops...",text:"Something went wrong!: "+e.responseText,confirmButtonColor:"rgb(246 146 32)",cancelButtonColor:"rgb(0 0 0)",footer:`\n              <div>\n                <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">\n              </div>\n            `})}}):(e(".t-terminal-city").select2("destroy"),e(".t-terminal-city").find("option").remove(),e(".t-terminal-city").append("<option value=''>Select City</option>"),e(".t-terminal-city").select2({placeholder:"Select city",allowClear:!0,width:"100%",dropdownCssClass:"t-form-control",dropdownParent:e(".t-terminal-city").parent()}),console.log("Please select state first!",a,n)):Swal.fire({icon:"error",title:"Oops...",text:"Please select country first!",confirmButtonColor:"rgb(246 146 32)",cancelButtonColor:"rgb(0 0 0)",footer:`\n          <div>\n            <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">\n          </div>\n        `})})),e(".t-terminal-city").select2({placeholder:"Select city",allowClear:!0,width:"100%",dropdownCssClass:"t-form-control",dropdownParent:e(".t-terminal-city").parent()})}))};clearAllForms=()=>{const e=document.querySelector("#t-form-submit");e&&(Array.from(e.elements).forEach((e=>{if("hidden"!==e.type)switch(e.type){case"checkbox":case"radio":e.checked=!1;break;default:e.value=""}})),jQuery(".t-terminal-country, .terminal-state, .terminal-city, .t-phone-new-select").val(null).trigger("change"))};formSubmitEvent=()=>{try{jQuery(document).ready((function(e){e("#t-form-submit").submit((function(t){t.preventDefault();var a=e(this),n=a.data("type"),l="terminal_merchant_save_address";"customer"==n&&(l="terminal_customer_save_address");var r=a.find('select[name="country"]').val(),i=a.find('input[name="phone"]').val();let s=terminal_africa.terminal_africal_countries.find((e=>e.isoCode===r)).phonecode;var o=encodeURIComponent("+");s.includes("+")||(s="+"+s),i?i.includes("+")||(i=s+i):i="",i=i.replace("+",o);let c=a.serialize();c=c.replace(/phone=[^&]+/,"phone="+i),e.ajax({type:"POST",url:terminal_africa.ajax_url,data:c+"&action="+l+"&nonce="+terminal_africa.nonce,dataType:"json",beforeSend:function(){Swal.fire({title:"Processing...",text:"Please wait...",imageUrl:terminal_africa.plugin_url+"/img/loader.gif",allowOutsideClick:!1,allowEscapeKey:!1,allowEnterKey:!1,showConfirmButton:!1,footer:`\n            <div>\n              <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">\n            </div>\n          `})},success:function(t){Swal.close(),200==t.code?Swal.fire({icon:"success",title:"Success!",text:t.message,confirmButtonColor:"rgb(246 146 32)",cancelButtonColor:"rgb(0 0 0)",iconColor:"rgb(246 146 32)",footer:`\n              <div>\n                <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">\n              </div>\n            `}).then((t=>{t.value&&("customer"==n?Swal.fire({icon:"info",title:"Info",text:"Customer address changed, please recalculate shipping fee",confirmButtonColor:"rgb(246 146 32)",cancelButtonColor:"rgb(0 0 0)",iconColor:"rgb(246 146 32)",footer:`\n                    <div>\n                      <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">\n                    </div>\n                  `}).then((t=>{t.value&&e("#t-carrier-change-button").trigger("click")})):location.reload())})):Swal.fire({icon:"error",title:"Oops...",text:t.message,confirmButtonColor:"rgb(246 146 32)",cancelButtonColor:"rgb(0 0 0)",footer:`\n              <div>\n                <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">\n              </div>\n            `})},error:function(e,t,a){Swal.close(),Swal.fire({icon:"error",title:"Oops...",text:"Something went wrong!: "+e.responseText,confirmButtonColor:"rgb(246 146 32)",cancelButtonColor:"rgb(0 0 0)",footer:`\n            <div>\n              <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">\n            </div>\n          `})}})}))}))}catch(e){console.log(e)}};render(){const{rate_id:e,shippingData:n}=this.props,{saved_address:l}=this.state;return(0,t.createElement)(a.Fragment,null,(0,t.createElement)("form",{method:"post",id:"t-form-submit","data-type":"customer"},(0,t.createElement)("input",{type:"hidden",name:"address_id",value:l?.address_id}),(0,t.createElement)("input",{type:"hidden",name:"rate_id",value:e}),(0,t.createElement)("div",{className:"terminal-responsive t-shipping-form-new"},(0,t.createElement)("div",{className:"row"},(0,t.createElement)("div",{className:"col-lg-6 col-md-6 col-sm-12"},(0,t.createElement)("div",{className:"form-group"},(0,t.createElement)("label",{htmlFor:"first_name"},"First Name"),(0,t.createElement)("input",{type:"text",className:"form-control",name:"first_name",id:"first_name",placeholder:"First Name",value:l?.first_name,onChange:e=>this.setState({saved_address:{...this.state.saved_address,first_name:e.target.value}})}))),(0,t.createElement)("div",{className:"col-lg-6 col-md-6 col-sm-12"},(0,t.createElement)("div",{className:"form-group"},(0,t.createElement)("label",{htmlFor:"last_name"},"Last Name"),(0,t.createElement)("input",{type:"text",className:"form-control",name:"last_name",id:"last_name",placeholder:"Last Name",value:l?.last_name,onChange:e=>{this.setState({saved_address:{...this.state.saved_address,last_name:e.target.value}})}}))),(0,t.createElement)("div",{className:"col-12"},(0,t.createElement)("div",{className:"form-group"},(0,t.createElement)("label",{htmlFor:"address_line_1"},"Address line 1"),(0,t.createElement)("input",{type:"text",className:"form-control",name:"line_1",id:"address_line_1",placeholder:"Address line 1",value:l?.line1,onChange:e=>{this.setState({saved_address:{...this.state.saved_address,line1:e.target.value}})}}))),(0,t.createElement)("div",{className:"col-12"},(0,t.createElement)("div",{className:"form-group"},(0,t.createElement)("label",{htmlFor:"address_line_2"},"Address line 2"),(0,t.createElement)("input",{type:"text",className:"form-control",name:"line_2",id:"address_line_2",placeholder:"Address line 2",value:l?.line2,onChange:e=>{this.setState({saved_address:{...this.state.saved_address,line2:e.target.value}})}}))),(0,t.createElement)("div",{className:"col-12"},(0,t.createElement)("div",{className:"form-group"},(0,t.createElement)("label",{htmlFor:"email"},"Email address"),(0,t.createElement)("div",{class:"input-group mb-3"},(0,t.createElement)("span",{className:"input-group-text t-input-group",id:"t-emal-input"},(0,t.createElement)("img",{src:terminal_africa.plugin_url+"/img/envelope.svg",alt:"t-email-icon"})),(0,t.createElement)("input",{type:"text",className:"form-control",name:"email",id:"email",placeholder:"Address line 2",value:l?.email,onChange:e=>{this.setState({saved_address:{...this.state.saved_address,email:e.target.value}})}})))),(0,t.createElement)("div",{className:"col-lg-4 col-md-4 col-sm-12"},(0,t.createElement)("div",{className:"form-group"},(0,t.createElement)("label",{htmlFor:"country"},"Country"),(0,t.createElement)("select",{className:"form-control terminal-country t-terminal-country",required:!0,name:"country",id:"country"},(0,t.createElement)("option",{value:""},"Select"),terminal_africa?.terminal_africal_countries.map(((e,a)=>(0,t.createElement)("option",{key:a,value:e.isoCode,"data-flag":e.flag,selected:e.isoCode===l?.country?"selected":""},e.name)))))),(0,t.createElement)("div",{className:"col-lg-4 col-md-4 col-sm-12"},(0,t.createElement)("div",{className:"form-group"},(0,t.createElement)("label",{htmlFor:"state"},"State"),(0,t.createElement)("select",{className:"form-control terminal-state t-terminal-state",required:!0,name:"state",id:"state"},(0,t.createElement)("option",{value:""},"Select"),n?.states?.map(((e,a)=>(0,t.createElement)("option",{key:a,value:e.name,"data-statecode":e.isoCode,selected:e.name===l?.state?"selected":""},e.name)))))),(0,t.createElement)("div",{className:"col-lg-4 col-md-4 col-sm-12"},(0,t.createElement)("div",{className:"form-group"},(0,t.createElement)("label",{htmlFor:"lga"},"City"),(0,t.createElement)("select",{className:"form-control terminal-city t-terminal-city",required:!0,name:"lga",id:"lga"},(0,t.createElement)("option",{value:""},"Select"),n?.cities?.data?.map(((e,a)=>(0,t.createElement)("option",{key:a,value:e.name,selected:e.name===l?.city?"selected":""},e.name)))))),(0,t.createElement)("div",{className:"col-lg-6 col-md-6 col-sm-12"},(0,t.createElement)("div",{className:"form-group"},(0,t.createElement)("label",{htmlFor:"phone"},"Phone Number"),(0,t.createElement)("div",{className:"d-flex"},(0,t.createElement)("div",{className:"t-phone-new-select-container"},(0,t.createElement)("select",{name:"country_code",id:"",className:"form-control t-phone-new-select"},terminal_africa?.terminal_africal_countries.map(((e,a)=>(0,t.createElement)("option",{key:a,value:e.phonecode,"data-flag":e.flag,"data-isocode":e.isoCode,selected:e.isoCode===l?.country?"selected":""},e.phonecode))))),(0,t.createElement)("div",{className:"w-100"},(0,t.createElement)("input",{type:"text",placeholder:"Phone number",className:"form-control t-phone-new",name:"phone",id:"phone",value:l?.phone,onChange:e=>{this.setState({saved_address:{...this.state.saved_address,phone:e.target.value}})}}))))),(0,t.createElement)("div",{className:"col-lg-6 col-md-6 col-sm-12"},(0,t.createElement)("div",{className:"form-group"},(0,t.createElement)("label",{htmlFor:"zipcode"},"Zip Code"),(0,t.createElement)("input",{type:"text",name:"zip_code",id:"zipcode",className:"form-control t-zip-new",placeholder:"Zip Code",value:l?.zip,onChange:e=>{this.setState({saved_address:{...this.state.saved_address,zip:e.target.value}})}}))),(0,t.createElement)("div",{className:"col-12"},(0,t.createElement)("div",{className:"t-flex",style:{justifyContent:"space-between"}},(0,t.createElement)("div",{className:"t-clear-form"},(0,t.createElement)("a",{href:"javascript:;",style:{"font-size":"15px",color:"black",outline:"none"},onClick:this.clearAllForms},(0,t.createElement)("div",{className:"t-flex"},(0,t.createElement)("img",{src:terminal_africa.plugin_url+"/img/clearform.svg",style:{marginRight:8},alt:"Clear forms"}),(0,t.createElement)("span",null,"Clear all fields")))),(0,t.createElement)("div",{className:"t-submit-form"},(0,t.createElement)("button",{type:"submit",className:"t-address-save",style:{width:"fit-content",padding:"13px 40px",borderRadius:12}},"Update address"))))))))}}var u=h;function f(){return(0,t.createElement)("div",{className:"t-row",style:{marginLeft:"25px"}},(0,t.createElement)("div",{className:"t-col-8 t-col-lg-8 t-col-md-8 t-col-sm-12"},(0,t.createElement)("div",{className:"terminal-skeleton",style:{height:"10px",width:"90%"}}),(0,t.createElement)("div",{style:{height:"10px"}}),(0,t.createElement)("div",{className:"terminal-skeleton",style:{height:"20px",width:"90%"}}),(0,t.createElement)("div",{style:{height:"10px"}}),(0,t.createElement)("div",{className:"terminal-skeleton",style:{height:"20px",width:"90%"}}),(0,t.createElement)("div",{style:{height:"10px"}}),(0,t.createElement)("div",{className:"terminal-skeleton",style:{height:"30px",width:"90%"}}),(0,t.createElement)("div",{style:{height:"10px"}}),(0,t.createElement)("div",{className:"t-row"},(0,t.createElement)("div",{className:"t-col-6"},(0,t.createElement)("div",{className:"terminal-skeleton",style:{height:"30px",width:"95%"}})),(0,t.createElement)("div",{className:"t-col-6"},(0,t.createElement)("div",{className:"terminal-skeleton",style:{height:"30px",width:"80%"}}))),(0,t.createElement)("div",{style:{height:"10px"}}),(0,t.createElement)("div",{className:"terminal-skeleton",style:{height:"30px",width:"90%"}}),(0,t.createElement)("div",{style:{height:"10px"}}),(0,t.createElement)("div",{className:"terminal-skeleton",style:{height:"40px",width:"90%"}}),(0,t.createElement)("div",{style:{height:"10px"}}),(0,t.createElement)("div",{className:"t-row"},(0,t.createElement)("div",{className:"t-col-6"},(0,t.createElement)("div",{className:"terminal-skeleton",style:{height:"30px",width:"95%"}})),(0,t.createElement)("div",{className:"t-col-6"},(0,t.createElement)("div",{className:"terminal-skeleton",style:{height:"30px",width:"80%"}}))),(0,t.createElement)("div",{style:{height:"10px"}}),(0,t.createElement)("div",{className:"terminal-skeleton",style:{height:"90px",width:"90%"}}),(0,t.createElement)("div",{style:{height:"10px"}})),(0,t.createElement)("div",{className:"t-col-4 t-col-lg-4 t-col-md-4 t-col-sm-12"},(0,t.createElement)("div",{className:"terminal-skeleton",style:{height:"380px",width:"90%"}})))}class v extends n().Component{constructor(e){super(e),this.state={isLoading:!0,shippingData:{},shippingStatus:{title:"--",className:"t-status-draft"},shippingTrackingNumber:"--"}}componentDidMount(){this.getApiData()}getUrlParams=e=>new URLSearchParams(window.location.search).get(e);getApiData=()=>{const e=this.getUrlParams("id"),t=this.getUrlParams("order_id"),a=this.getUrlParams("rate_id");jQuery(document).ready((n=>{n.ajax({type:"GET",url:terminal_africa.ajax_url,data:{action:"terminal_africa_get_shipping_api_data",id:e,order_id:t,rate_id:a,nonce:terminal_africa.nonce},dataType:"json",beforeSend:()=>{this.setState({isLoading:!0})},success:e=>{200===e.code?(this.setState({isLoading:!1}),this.setState({shippingData:e.data}),this.getShippingStatus()):Swal.fire({icon:"error",title:"Oops...",text:"Something went wrong!: "+e.message,confirmButtonColor:"rgb(246 146 32)",cancelButtonColor:"rgb(0 0 0)",footer:`\n                        <div>\n                            <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">\n                        </div>\n                        `})},error:(e,t,a)=>{Swal.fire({icon:"error",title:"Oops...",text:"Something went wrong!: "+e.responseText,confirmButtonColor:"rgb(246 146 32)",cancelButtonColor:"rgb(0 0 0)",footer:`\n                    <div>\n                        <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">\n                    </div>\n                    `})}})}))};getShippingStatus=()=>{jQuery(document).ready((e=>{const{shipping_id:t,order_id:a}=this.state.shippingData,n=this.getUrlParams("rate_id");e.ajax({type:"GET",url:terminal_africa.ajax_url,data:{action:"get_terminal_shipment_status",nonce:terminal_africa.nonce,shipment_id:t,order_id:a,rate_id:n},dataType:"json",beforeSend:()=>{Swal.fire({title:"Please wait...",text:"We are fetching your shipment status",imageUrl:terminal_africa.plugin_url+"/img/loader.gif",allowOutsideClick:!1,allowEscapeKey:!1,allowEnterKey:!1,showConfirmButton:!1,footer:`\n        <div>\n          <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">\n        </div>\n      `})},success:a=>{if(Swal.close(),200===a.code){this.setState({shippingStatus:{title:a.data,className:"t-status-"+a.data}});let n=a.shipment_info.cancellation_request;if(n?e("#terminal_shipment_status").html("PENDING CANCELLATION"):e("#terminal_shipment_status").html(a.data),!n){const{shipment_info:{extras:n={},address_from:l={},address_to:r={}}={}}=a,{shipping_label_url:i,tracking_number:s,commercial_invoice_url:o,carrier_tracking_url:c}=n,m=l.country,d=r.country;this.setState({shippingTrackingNumber:s});const p=m!==d?`\n                  <br>\n                  <p class="t-shipping-p-left">\n                    <b>Commercial Invoice:</b> <a href="${o}" class="t-shipment-info-link" target="_blank">View Invoice</a>\n                  </p>\n                  <p class="t-shipping-p-left">\n                    <b>Carrier Tracking:</b> <a href="${c}" class="t-shipment-info-link" target="_blank">View Tracking</a>\n                  </p>\n                `:"",g=`\n                  <div class="t-space"></div>\n                  ${i?`\n                  <p class="t-shipping-p-left">\n                    <b>Shipping Label:</b> <a href="${i}" class="t-shipment-info-link" target="_blank">View Label</a>\n                  </p>\n                `:""}\n                  <p class="t-shipping-p-left">\n                    <b>Tracking Link:</b> <a href="${terminal_africa.tracking_url+t}" class="t-shipment-info-link" target="_blank">Track Shipment</a>\n                  </p>\n                  ${p}\n                  <div class="t-space"></div>\n                `;e("#t_carriers_location").before(g)}e("#t_carriers_location").html(a.button)}else Swal.fire({icon:"error",title:"Oops...",text:a.message,confirmButtonColor:"rgb(246 146 32)",confirmButtonText:"Continue",footer:`\n              <div>\n                <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">\n              </div>\n            `})}})}))};render(){const{isLoading:e,shippingData:n,shippingStatus:l,shippingTrackingNumber:r}=this.state,i=this.getUrlParams("rate_id");return(0,t.createElement)(a.Fragment,null,e?(0,t.createElement)(f,null):(0,t.createElement)("div",{className:"t-row"},(0,t.createElement)("div",{className:"t-col-8 t-col-lg-8 t-col-md-12 t-col-sm-12"},(0,t.createElement)("div",{className:"t-ml-5 t-side-left"},(0,t.createElement)(p,{shippingData:n,shippingStatus:l}),(0,t.createElement)(u,{saved_address:n.saved_address,rate_id:i,shippingData:n}))),(0,t.createElement)("div",{className:"t-col-4 t-col-lg-4 t-col-md-12 t-col-sm-12"},(0,t.createElement)(g,{shippingData:n,shippingTrackingNumber:r,trackingLink:""}))))}}var _=v;document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("t-phonebook-container");e&&r().render((0,t.createElement)(m,null),e);const a=document.getElementById("manage-terminal-shipping");a&&r().render((0,t.createElement)(_,null),a)}))}();