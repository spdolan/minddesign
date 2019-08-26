(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{150:function(e,t,a){e.exports=a(321)},320:function(e,t,a){},321:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"SAVE_DESIGN",function(){return h}),a.d(n,"GET_FILE",function(){return g}),a.d(n,"RENDER_DESIGN",function(){return b}),a.d(n,"AUTH_USER",function(){return f}),a.d(n,"AUTH_ERROR",function(){return v}),a.d(n,"GET_DESIGN",function(){return E}),a.d(n,"GET_DESIGNS",function(){return y}),a.d(n,"PUBLIC_DESIGNS",function(){return w}),a.d(n,"SLICE_DESIGN",function(){return N}),a.d(n,"signup",function(){return S}),a.d(n,"signin",function(){return D}),a.d(n,"signout",function(){return O}),a.d(n,"updateDesign",function(){return j}),a.d(n,"downloadFile",function(){return k}),a.d(n,"getUserDesigns",function(){return M}),a.d(n,"getPublicDesigns",function(){return x}),a.d(n,"getDesign",function(){return C}),a.d(n,"saveDesign",function(){return I}),a.d(n,"createGcode",function(){return G});var r=a(0),o=a.n(r),i=a(25),c=a(35),s=a(24),l=a(6),u=a(3),d=a(142),m=a(30),p=a.n(m),h="SAVE_DESIGN",g="GET_FILE",b="RENDER_DESIGN",f="AUTH_USER",v="AUTH_ERROR",E="GET_DESIGN",y="GET_DESIGNS",w="PUBLIC_DESIGNS",N="SLICE_DESIGN",S=function(e,t){return function(a){p.a.post("auth/signup",e).then(function(e){a({type:f,payload:e.data}),localStorage.setItem("token",e.data.token),localStorage.setItem("email",e.data.email),localStorage.setItem("name",e.data.name),localStorage.setItem("id",e.data.id),t()}).catch(function(e){a({type:v,payload:"Confirmation email sent, please check your inbox."})})}},D=function(e,t){return function(a){p.a.post("auth/signin",e).then(function(e){a({type:f,payload:e.data}),localStorage.setItem("token",e.data.token),localStorage.setItem("email",e.data.email),localStorage.setItem("name",e.data.name),localStorage.setItem("id",e.data.id),t()}).catch(function(e){a({type:v,payload:"Email in use"})})}},O=function(){return localStorage.removeItem("token"),localStorage.removeItem("email"),localStorage.removeItem("name"),localStorage.removeItem("id"),{type:f,payload:""}},j=function(e,t){return function(a){var n=localStorage.getItem("id");n||(n="guest"),p.a.post("/designs/".concat(n,"/").concat(e),{data:t}).then(function(e){a({type:h,payload:e.data})}).catch(function(e){console.log(e)})}},k=function(e){return function(t){var a=localStorage.getItem("id");""===a&&(a="guest"),p.a.get("/download/".concat(a,"/").concat(e)).then(function(e){t({type:g,payload:e})}).catch(function(e){console.log(e)})}},M=function(e){return function(t){p.a.get("/users/".concat(e,"/")).then(function(e){t({type:y,payload:e.data})}).catch(function(e){console.log(e)})}},x=function(){return function(e){p.a.get("/designs/",{public:!0}).then(function(t){e({type:w,payload:t.data})}).catch(function(e){console.log(e)})}},C=function(e){return function(t){p.a.get("/designs/".concat(e)).then(function(e){t({type:E,payload:e.data})}).catch(function(e){console.log(e)})}},I=function(e,t){return function(a){p.a.get("/designs/".concat(e,"/").concat(t,"/save")).then(function(e){a({type:h,payload:e.data})}).catch(function(e){console.log(e)})}},G=function(e){return function(t){var a=localStorage.getItem("id");""===a&&(a="guest"),p.a.get("/designs/".concat(a,"/").concat(e,"/gcode")).then(function(e){alert(e.data)}).catch(function(e){console.log(e)})}},P=a(93),U={authenticated:localStorage.getItem("token")||"",email:localStorage.getItem("email")||"",name:localStorage.getItem("name")||"",id:localStorage.getItem("id")||"",errorMessage:""},R=a(329),L=Object(u.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case f:return Object(P.a)({},e,{authenticated:t.payload.token,email:t.payload.email,name:t.payload.name,id:t.payload.id});case v:return Object(P.a)({},e,{errorMessage:t.payload});default:return e}},form:R.a,timeStamp:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};switch((arguments.length>1?arguments[1]:void 0).type){case h:case g:return{timeStamp:new Date};default:return e}},currentModel:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"MDlogo-v0.svg",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case h:return t.payload.fileName;case E:return"".concat(t.payload[0].designName,".svg");case f:return"MDlogo-v0.svg";default:return e}},designs:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;if(t.error)return t.error;switch(t.type){case y:case w:case E:return t.payload;default:return e}}}),F=a(8),H=a(9),_=a(11),T=a(10),B=a(12);var W=Object(l.b)(function(e){return{authenticated:e.auth.authenticated,email:e.auth.email,name:e.auth.name}},n)(function(e){var t=e.authenticated,a=(e.email,e.name),n=e.signout,r=function(){n()};return o.a.createElement("nav",{className:"navbar fixed-top navbar-dark bg-dark align-middle text-align-middle"},o.a.createElement("a",{className:"navbar-brand",href:"/"},o.a.createElement("img",{src:"/MindDesignv1.png",width:"auto",height:"30",className:"d-inline-block align-top",alt:"Mind Design"})),o.a.createElement("div",{className:""},o.a.createElement("ul",{className:"navbar-nav mr-2"},t?o.a.createElement(o.a.Fragment,null,o.a.createElement("li",{className:"nav-item mx-2"},o.a.createElement(i.b,{to:"/public",className:"btn btn-md btn-light"},"Published Designs")),o.a.createElement("li",{className:"nav-item mx-2"},o.a.createElement(i.b,{to:"/home",className:"btn btn-md btn-secondary"},a,"'s Designs")),o.a.createElement("li",{className:"nav-item mx-2"},o.a.createElement("button",{onClick:r,className:"btn btn-md btn-info"},"Sign Out"))):o.a.createElement(o.a.Fragment,null,o.a.createElement("li",{className:"nav-item mx-2"},o.a.createElement(i.b,{to:"/signup",className:"btn btn-sm btn-primary"},"Sign Up")),o.a.createElement("li",{className:"nav-item mx-2"},o.a.createElement(i.b,{to:"/signin",className:"btn btn-sm btn-success"},"Sign In"))))))}),A=a(149),V=a(15),z=a(145);window.THREE=z,a(236),a(237),a(238),a(115);var Y=window.THREE,q=(a(115),a(147)),J=a.n(q),K=a(88),Q=a.n(K),X=a(29),Z=a.n(X),$=(a(146),a(41)),ee=a.n($);a(275);var te=new Y.Scene;te.background=new Y.Color(14737632);var ae,ne,re=new Y.GridHelper(160,10);re.rotation.x=Math.PI/2,te.add(re),window.innerWidth<=768?(ae=.8*window.innerWidth,ne=.5*window.innerHeight):(ae=.37*window.innerWidth,ne=.5*window.innerHeight);var oe=new Y.PerspectiveCamera(50,ae/ne,1,1e3);oe.position.set(0,0,200);var ie=new Y.WebGLRenderer({antialias:!0});ie.setPixelRatio(window.devicePixelRatio),ie.setSize(ae,ne),new Y.OrbitControls(oe,ie.domElement).screenSpacePanning=!0;var ce,se=new Y.SVGLoader,le=new Y.STLExporter,ue=document.createElement("a");ue.style.display="none",document.body.appendChild(ue);var de=function e(){requestAnimationFrame(e),ie.render(te,oe)},me=function(){window.innerWidth<=768?(ae=.8*window.innerWidth,ne=.5*window.innerHeight):(ae=.37*window.innerWidth,ne=.5*window.innerHeight),oe.aspect=ae/ne,oe.updateProjectionMatrix(),ie.setSize(ae,ne)},pe=function e(t){for(var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;t.children.length>a;)e(t.children[t.children.length-1]),t.remove(t.children[t.children.length-1]);t.geometry&&t.geometry.dispose(),void 0!==t.material&&(void 0!==t.material.length?t.material.forEach(function(e){e.dispose()}):t.material.dispose()),t.texture&&t.texture.dispose()},he=function(e,t){e.scale.multiplyScalar(t),e.scale.y*=-1},ge=function(e,t){be(new Blob([e],{type:"application/octet-stream"}),t)},be=function(e,t){ue.href=URL.createObjectURL(e),ue.download=t,ue.click()},fe=function(e){for(var t=e.filter(function(e){return 0!==e}),a=[],n=0;n<t.length;n+=2){var r=new Y.Vector2(t[n],t[n+1]);a.push(r)}return a},ve=function(e,t,a){return new Y.MeshBasicMaterial({color:(new Y.Color).setStyle(e),opacity:t,transparent:a,side:Y.DoubleSide,depthWrite:!1})},Ee=function(e,t){se.load(e,function(a){var n=a.paths;ce=new Y.Group;var r={depth:10,steps:1,bevelEnabled:!1,bevelThickness:2,bevelSize:4,bevelSegments:1};!function(e){var t;e.includes("tiger")?(t=.25,ce.position.x=-70,ce.position.y=70):(t=.6,ce.position.x=-85,ce.position.y=85),he(ce,t),ce.updateMatrixWorld(!0)}(e);for(var o=0;o<n.length;o++){var i=n[o],c=i.userData.style.fill;if(void 0!==c&&"none"!==c)for(var s=ve(c,i.userData.style.fillOpacity,i.userData.style.fillOpacity<1),l=i.toShapes(!0),u=0;u<l.length;u++){var d=l[u];if(t){var m=new Y.ExtrudeBufferGeometry(d,r),p=new Y.Mesh(m,s);ce.add(p)}else{var h=new Y.ShapeBufferGeometry(d),g=new Y.Mesh(h,s);ce.add(g)}}var b=i.userData.style.stroke;if(void 0!==b&&"none"!==b){for(var f=ve(b,i.userData.style.strokeOpacity,i.userData.style.strokeOpacity<1),v=0,E=i.subPaths.length;v<E;v++){var y,w,N,S=i.subPaths[v];if(t&&!e.includes("tiger")){if(v<i.subPaths.length){y=new Y.SVGLoader.pointsToStroke(S.getPoints(),i.userData.style);for(var D=fe(y.attributes.position.array),O=0;O<D.length;O+=3){var j=new Y.Shape([D[O],D[O+1],D[O+2]]);j&&(N=new Y.ExtrudeBufferGeometry(j,r),w=new Y.Mesh(N,f),ce.add(w))}}}else v<i.subPaths.length&&(y=new Y.SVGLoader.pointsToStroke(S.getPoints(),i.userData.style))&&(w=new Y.Mesh(y,f),ce.add(w))}te.add(ce)}}var k=ve(65535,.3,!0);!function(e,t,a,n,r){var o=new Y.BoxHelper(a,16776960),i=o.geometry.boundingSphere.center.x,c=o.geometry.boundingSphere.center.y;if(e&&!r.includes("tiger")){var s;if("circle"===t){var l=1/a.scale.x*o.geometry.boundingSphere.radius,u=new Y.CylinderBufferGeometry(l,l,2,64);(s=new Y.Mesh(u,n)).position.set(1/a.scale.x*(Math.abs(a.position.x)+i),-1/a.scale.y*(Math.abs(a.position.y)-c),1),s.rotation.set(Math.PI/2,0,0)}else"square"===t&&(s=new Y.BoxHelper(a,16776960));a.add(s),te.updateMatrixWorld(!0)}}(t,"circle",ce,[f,k],e)},function(e){if(e.lengthComputable){var t=e.loaded/e.total*100;console.log(Math.round(t,2)+"% rendered")}},function(e){console.log("An error happened")})},ye=function(e){function t(e){var a;return Object(F.a)(this,t),(a=Object(_.a)(this,Object(T.a)(t).call(this,e))).saveSVG=function(){var e=""===a.props.auth.id?"guest":a.props.auth.id,t=a.props.owner?a.props.owner:e,n="https://minddesign-assets.s3.amazonaws.com/".concat(t,"/designs/").concat(a.props.currentModel);ue.href=n,ue.download=a.props.currentModel,ue.click()},a.update=function(){pe(te);var e=""===a.props.auth.id?"guest":a.props.auth.id,t=a.props.owner?a.props.owner:e,n="https://minddesign-assets.s3.amazonaws.com/".concat(t,"/designs/").concat(a.props.currentModel);a.setState({extrude:!a.state.extrude},function(){alert("Loading, one moment please - our trusty gnomes are ".concat(a.state.extrude?"Extrud":"Flatten","ing your design...")),Ee(n,a.state.extrude)})},a.state={circle:!0,extrude:!1,isLoading:!1},a.saveSVG=a.saveSVG.bind(Object(V.a)(a)),a.renderDownloadButton=a.renderDownloadButton.bind(Object(V.a)(a)),a.handleSaveDesign=a.handleSaveDesign.bind(Object(V.a)(a)),a}return Object(B.a)(t,e),Object(H.a)(t,[{key:"componentDidMount",value:function(){if(this.mount.appendChild(ie.domElement),pe(te),this.props.currentUrl){pe(te);var e=this.props.owner?this.props.owner:this.props.auth.id,t="https://minddesign-assets.s3.amazonaws.com/".concat(e,"/designs/").concat(this.props.currentModel);Ee(t,!1)}else Ee("https://minddesign-assets.s3.amazonaws.com/MDlogo-v0.svg",!1);window.addEventListener("resize",me,!1),de()}},{key:"componentWillUnmount",value:function(){pe(te)}},{key:"componentDidUpdate",value:function(){var e=""===this.props.auth.id||void 0===this.props.auth.id?"guest":this.props.auth.id,t=this.props.owner?this.props.owner:e,a="https://minddesign-assets.s3.amazonaws.com/".concat(t,"/designs/").concat(this.props.currentModel);pe(te),Ee(a,this.state.extrude),de()}},{key:"renderDownloadButton",value:function(e){var t=this;return e?o.a.createElement("button",{className:"btn btn-block btn-primary mb-2",onClick:function(e){e.preventDefault();var a=t.props.currentModel.split(".");!function(e,t){he(e,.2),e.updateMatrixWorld(!0);var a=le.parse(e,{binary:!0});ge(a,"".concat(t,".stl")),pe(te,2)}(ce,a[0])}},"Download As 3D Mini-Stamp"):o.a.createElement("button",{className:"btn btn-block btn-primary mb-2",onClick:function(e){e.preventDefault(),t.saveSVG()}},"Download As Picture")}},{key:"handleSaveDesign",value:function(e){if(e){var t=this.props.currentModel.indexOf("."),a=this.props.currentModel.slice(0,t);this.props.saveDesign(this.props.auth.id,a),alert("Designed saved! Check it out under ".concat(this.props.auth.name,"'s Designs"))}else alert("You'll to need to be Signed In to save! \nPlease use the links in the navigation above.")}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"container text-center"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-12"},o.a.createElement("div",{className:"row mb-2"},o.a.createElement("div",{className:"col-6"},this.renderDownloadButton(this.state.extrude)),this.props.currentUrl?o.a.createElement("div",null):o.a.createElement("div",{className:"col-6"},o.a.createElement("button",{className:"btn btn-block btn-success",onClick:function(t){t.preventDefault(),e.handleSaveDesign(e.props.auth.authenticated)}},"Save My Design"))),o.a.createElement("div",{className:"row mb-2 border border-dark rounded-lg py-1"},o.a.createElement("div",{className:"col-12"},o.a.createElement("h6",{className:"d-inline float-left align-center"},"Controls:"),o.a.createElement(J.a,{type:"checkbox",value:this.state.extrude,onChange:this.update},o.a.createElement(Q.a,{value:1,variant:"info"},this.state.extrude?"Flatten":"Make 3D")),this.props.auth.authenticated&&this.state.extrude?o.a.createElement("button",{className:"btn btn-md btn-secondary ml-3",onClick:function(t){t.preventDefault();var a=e.props.currentModel.split(".");e.props.createGcode(a[0])}},"Create GCode"):o.a.createElement("div",null))),o.a.createElement("div",{ref:function(t){return e.mount=t}}),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-12"},o.a.createElement("button",{className:"btn btn-block btn-secondary",onClick:function(e){return pe(te)}},"Clear Canvas"))))))}}]),t}(r.Component);var we=Object(l.b)(function(e,t){return{currentModel:e.currentModel,timeStamp:e.timeStamp,auth:e.auth,currentUrl:t.url}},function(e){return Object(u.b)({downloadFile:k,saveDesign:I,createGcode:G},e)})(ye),Ne=a(148),Se=a.n(Ne),De=function(e){function t(e){var a;return Object(F.a)(this,t),(a=Object(_.a)(this,Object(T.a)(t).call(this,e))).createRandomNumber=function(){return Math.floor(1e8*Math.random())},a.createFileName=function(){return a.props.auth.authenticated?"".concat(a.props.auth.name,"-").concat(a.createRandomNumber(),".svg"):"guest-".concat(a.createRandomNumber(),".svg")},a.clear=function(){a.setState({fileName:a.createFileName()},function(){a.sigPad.clear()})},a.renderDrawing=function(){a.setState({svgDataURL:a.sigPad.toDataURL("image/svg+xml")},function(){var e=a.state.svgDataURL.split(",");a.props.updateDesign(a.state.fileName,atob(e[1]))})},a.state={svgDataURL:null,fileNumber:null},a.sigPad={},a.createRandomNumber=a.createRandomNumber.bind(Object(V.a)(a)),a.createFileName=a.createFileName.bind(Object(V.a)(a)),a}return Object(B.a)(t,e),Object(H.a)(t,[{key:"componentDidMount",value:function(){this.setState({fileName:this.createFileName()})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"container text-center justify-content-center"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-12"},o.a.createElement("h3",{className:"text-center justify-content-center"},"Start Sketching:"))),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-12"},o.a.createElement(Se.a,{ref:function(t){e.sigPad=t},penColor:"black",backgroundColor:"rgb(255,255,255)",canvasProps:{width:300,height:300,minwidth:30,maxwidth:35,mindistance:10,throttle:0,className:"sigPad mt-4"}}))),o.a.createElement("button",{className:"btn btn-secondary btn-lg mr-2",onClick:this.clear},"Clear Pad"),o.a.createElement("button",{className:"btn btn-success btn-lg",onClick:this.renderDrawing},"Draw To Canvas"))}}]),t}(r.Component);var Oe=Object(l.b)(function(e){return{auth:e.auth,timeStamp:e.timeStamp}},function(e){return Object(u.b)({updateDesign:j},e)})(De);var je=function(e){return o.a.createElement(Z.a,Object.assign({},e,{size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0}),o.a.createElement(Z.a.Header,{closeButton:!0},o.a.createElement(Z.a.Title,{id:"contained-modal-title-vcenter"},"Welcome to Mind Design!")),o.a.createElement(Z.a.Body,null,o.a.createElement("h4",null,"Getting Started"),o.a.createElement("ul",null,o.a.createElement("li",null,"Use a stylus (or your favorite digit) to draw in the blank white box below."),o.a.createElement("li",null,"Click 'Clear Pad' if that doesn't feel right. Click 'Draw To Canvas' if it does!"),o.a.createElement("li",null,"Your design will then appear in the grey canvas. From there..."),o.a.createElement("li",null,"Feel free to download as an SVG image file!"),o.a.createElement("li",null,"Or click 'Extrude' to see as a mini-stamp, you'll be able to download a 3D file of it."))),o.a.createElement(Z.a.Footer,null,o.a.createElement(ee.a,{onClick:e.onHide},"Close")))};var ke=Object(l.b)(function(e){return{auth:e.auth}},null)(function(e){var t=e.auth,a=!t.authenticated,n=o.a.useState(a),r=Object(A.a)(n,2),i=r[0],c=r[1];return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-md-12 text-center"},o.a.createElement("div",{className:"jumbotron mt-2"},function(e){return e.authenticated?o.a.createElement("h1",{className:"display-5"},"Welcome back, ",e.name):o.a.createElement("h1",{className:"display-5"},function(){var e=["Let's start Making!","Hand drawn, beyond hand made.","Hand-made for 2019.","Picture beyond pixels."];return e[Math.floor(Math.random()*e.length)]}())}(t)),o.a.createElement(je,{show:i,onHide:function(){return c(!1)}}))),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-12 col-md-6 mb-4"},o.a.createElement(we,null)),o.a.createElement("div",{className:"col-12 col-md-6 canvas text-center mb-5"},o.a.createElement(Oe,null))),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-md-8 offset-md-1"})))}),Me=a(328),xe=a(327),Ce=function(e){function t(){var e,a;Object(F.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(_.a)(this,(e=Object(T.a)(t)).call.apply(e,[this].concat(r)))).onSubmit=function(e){a.props.signup(e,function(){a.props.history.push("/")})},a}return Object(B.a)(t,e),Object(H.a)(t,[{key:"render",value:function(){var e=this.props.handleSubmit;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-10 offset-1 mt-4"},o.a.createElement("form",{onSubmit:e(this.onSubmit)},o.a.createElement("fieldset",{className:"form-group"},o.a.createElement("label",null,"Name"),o.a.createElement(Me.a,{name:"name",type:"text",placeholder:"What's your handle?",component:"input",autoComplete:"none",className:"form-control"})),o.a.createElement("fieldset",{className:"form-group"},o.a.createElement("label",null,"Email"),o.a.createElement(Me.a,{name:"email",type:"text",placeholder:"rick@councilofricks.singularity",component:"input",autoComplete:"none",className:"form-control"})),o.a.createElement("fieldset",{className:"form-group"},o.a.createElement("label",null,"Password"),o.a.createElement(Me.a,{name:"password",type:"password",placeholder:"Anything but 'password'...",component:"input",autoComplete:"none",className:"form-control"})),o.a.createElement("div",null,this.props.errorMessage),o.a.createElement("button",{className:"btn btn-lg btn-outline-success"},"Sign Up!")))))}}]),t}(r.Component);var Ie=Object(u.d)(Object(l.b)(function(e){return{errorMessage:e.auth.errorMessage}},n),Object(xe.a)({form:"signup"}))(Ce),Ge=function(e){function t(){var e,a;Object(F.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(_.a)(this,(e=Object(T.a)(t)).call.apply(e,[this].concat(r)))).onSubmit=function(e){a.props.signin(e,function(){a.props.history.push("/")})},a}return Object(B.a)(t,e),Object(H.a)(t,[{key:"render",value:function(){var e=this.props.handleSubmit;return o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-10 offset-1 mt-4"},o.a.createElement("form",{onSubmit:e(this.onSubmit)},o.a.createElement("fieldset",{className:"form-group"},o.a.createElement("label",null,"Email"),o.a.createElement(Me.a,{name:"email",placeholder:"root@eruditorum.org",type:"text",component:"input",autoComplete:"none",className:"form-control"})),o.a.createElement("fieldset",{className:"form-group"},o.a.createElement("label",null,"Password"),o.a.createElement(Me.a,{name:"password",type:"password",component:"input",autoComplete:"none",className:"form-control"})),o.a.createElement("div",null,this.props.errorMessage),o.a.createElement("button",{className:"btn btn-lg btn-outline-primary"},"Sign In!")))))}}]),t}(r.Component);var Pe=Object(u.d)(Object(l.b)(function(e){return{errorMessage:e.auth.errorMessage}},n),Object(xe.a)({form:"signin"}))(Ge);var Ue=Object(l.b)(null,function(e){return Object(u.b)({},e)})(function(e){var t,a=e.design;return o.a.createElement(i.b,{className:"card text-center align-middle text-white bg-dark border-dark shadow",to:"/home/".concat(a._id)},o.a.createElement("div",{className:"card-body"},o.a.createElement("h5",{className:"card-title"},a.designName),o.a.createElement("img",{src:a.svgLink,height:"auto",width:"auto",className:"card-img-top",style:{background:function(){var e=Math.floor(360*Math.random()),t=Math.floor(100*Math.random());return"hsla(".concat(e,",").concat(t,"%,").concat(40,"%,",.7,")")}()},alt:"sweet design"})),o.a.createElement("div",{className:"card-footer"},o.a.createElement("p",null,"created on ",(t=a.created_at,new Date(t).toLocaleDateString()))))}),Re=function(e){function t(e){var a;return Object(F.a)(this,t),(a=Object(_.a)(this,Object(T.a)(t).call(this,e))).renderDesigns=a.renderDesigns.bind(Object(V.a)(a)),a}return Object(B.a)(t,e),Object(H.a)(t,[{key:"componentDidMount",value:function(){}},{key:"renderDesigns",value:function(e){return e.map(function(e){return o.a.createElement(Ue,{design:e,key:e._id})})}},{key:"render",value:function(){return this.props.designs?0===this.props.designs.length?o.a.createElement("div",null,o.a.createElement("h4",null,"Hey! Looks like there aren't any designs here yet!"),o.a.createElement("h4",null,"Unless we're briefly searching, head to the homepage and make something awesome.")):(console.log(this.props.designs),o.a.createElement("div",{className:"card-columns mb-4"},this.renderDesigns(this.props.designs))):o.a.createElement("h1",null,"Nothing to see here yet... hold please...")}}]),t}(o.a.Component);var Le=Object(l.b)(function(e){return{auth:e.auth}},function(e){return Object(u.b)({getUserDesigns:M},e)})(Re),Fe=function(e){function t(e){var a;return Object(F.a)(this,t),(a=Object(_.a)(this,Object(T.a)(t).call(this,e))).state={},a.displayDesigns=a.displayDesigns.bind(Object(V.a)(a)),a}return Object(B.a)(t,e),Object(H.a)(t,[{key:"componentDidMount",value:function(){this.props.getUserDesigns(this.props.auth.id)}},{key:"displayDesigns",value:function(){return this.props.designs?0===this.props.designs.length?o.a.createElement("div",null,o.a.createElement("h4",null,"Hey! Looks like you don't have any designs yet!"),o.a.createElement("h4",null,"Unless we're briefly searching, head to the homepage and make something awesome.")):o.a.createElement(Le,{designs:this.props.designs}):o.a.createElement("h1",null,"Nothing to see here yet... hold please...")}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-12 text-center"},o.a.createElement("div",{className:"jumbotron"},o.a.createElement("h3",null,this.props.auth.name)))),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-12"},this.displayDesigns())))}}]),t}(r.Component);var He=Object(l.b)(function(e){return{auth:e.auth,designs:e.designs}},function(e){return Object(u.b)({getUserDesigns:M},e)})(Fe),_e=function(e){function t(e){return Object(F.a)(this,t),Object(_.a)(this,Object(T.a)(t).call(this,e))}return Object(B.a)(t,e),Object(H.a)(t,[{key:"componentDidMount",value:function(){this.props.getDesign(this.props.currentModelId)}},{key:"render",value:function(){return this.props.designs?0===this.props.designs.length||void 0===this.props.designs.length?o.a.createElement("div",null,o.a.createElement("h3",null,"Your Design is loading, one moment please...")):o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-12"},o.a.createElement("div",null,"Stats for ",this.props.designs[0].designName,o.a.createElement("br",null),"Makes: 5",o.a.createElement("br",null),"Likes: ",this.props.designs[0].likes,o.a.createElement("br",null)))),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-8"},o.a.createElement(we,{url:"user",owner:this.props.designs[0].designOwner})))):o.a.createElement("div",null,o.a.createElement("h3",null,"Hold please, we're loading..."))}}]),t}(o.a.Component);var Te=Object(l.b)(function(e,t){return{auth:e.auth,designs:e.designs,currentModel:e.currentModel,currentModelId:t.match.params.designId}},function(e){return Object(u.b)({getDesign:C},e)})(_e),Be=function(e){function t(e){var a;return Object(F.a)(this,t),(a=Object(_.a)(this,Object(T.a)(t).call(this,e))).state={},a.displayDesigns=a.displayDesigns.bind(Object(V.a)(a)),a}return Object(B.a)(t,e),Object(H.a)(t,[{key:"componentDidMount",value:function(){this.props.getPublicDesigns()}},{key:"displayDesigns",value:function(){return this.props.designs?0===this.props.designs.length?o.a.createElement("div",null,o.a.createElement("h4",null,"Hey! Looks like you don't have any designs yet!"),o.a.createElement("h4",null,"Unless we're briefly searching, head to the homepage and make something awesome.")):o.a.createElement(Le,{designs:this.props.designs}):o.a.createElement("h1",null,"Nothing to see here yet... hold please...")}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-12"},this.displayDesigns())))}}]),t}(r.Component);var We=Object(l.b)(function(e){return{auth:e.auth,designs:e.designs}},function(e){return Object(u.b)({getPublicDesigns:x},e)})(Be),Ae=function(e){function t(e){return Object(F.a)(this,t),Object(_.a)(this,Object(T.a)(t).call(this,e))}return Object(B.a)(t,e),Object(H.a)(t,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(W,null),o.a.createElement("div",{className:"container main-app"},o.a.createElement(c.d,null,o.a.createElement(c.b,{exact:!0,path:"/",component:ke}),o.a.createElement(c.b,{exact:!0,path:"/signin",component:Pe}),o.a.createElement(c.b,{exact:!0,path:"/signup",component:Ie}),o.a.createElement(c.b,{exact:!0,path:"/public",component:We}),o.a.createElement(c.b,{exact:!0,path:"/home",component:He}),o.a.createElement(c.b,{exact:!0,path:"/home/:designId",component:Te}),o.a.createElement(c.a,{to:"/"}))))}}]),t}(r.Component);var Ve=Object(l.b)(function(e){return{auth:e.auth}},function(e){return Object(u.b)(n,e)})(Ae),ze=(a(318),a(319),a(320),Object(u.e)(L,{},Object(u.a)(d.a)));Object(s.render)(o.a.createElement(l.a,{store:ze},o.a.createElement(i.a,null,o.a.createElement(c.d,null,o.a.createElement(c.b,{path:"/",component:Ve})))),document.getElementById("root"))}},[[150,1,2]]]);
//# sourceMappingURL=main.2ebece8c.chunk.js.map