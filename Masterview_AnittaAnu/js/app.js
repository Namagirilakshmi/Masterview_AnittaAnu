// React Component starts here
var DinoClass = React.createClass({
//getting initial state
getInitialState: function() {
      return {
        data:{},
      };
    },
// when clicking tab
    tabFunc:function(e) {
      var description="";
      var dinoValue=Object.values(this.state.data);
      var descKey=Object.keys(dinoValue[e]);
      var desc=Object.values(dinoValue[e]);
      var i=0;
      var descDiv=""; 
      var flag=1;
      descDiv+='<div class="dinoName">'+Object.keys(this.state.data)[e]+'</div>';
      var totalDesc='<div class="transbox">';
      desc.forEach(function(text){
              if(i==0){
                $("#dinosaraus").css({'background-image':'url(' + text + ')', 'background-repeat':'no-repeat','background-position': 'center','background-size': '100% 100%'});
              }
              else if(descKey[i]=="description"){
                  descDiv+='<div class="detailDescription">'+text+'</div>';
              }
              else{
              descDiv+='<div class="description"><p class="descLeft">'+descKey[i]+'</p> : <p class="descRight">'+text+'</p></div>';
              }
               i++;               
            });
        description+=descDiv;
        totalDesc+=description;
        totalDesc+='</div>';
        $("#dinosaraus").html(totalDesc);
// animation function
        $(".transbox").animate({height: 'toggle'});
        $(".transbox").animate({height: 'toggle'});
// functions for mobile view
       var mql = window.matchMedia("(max-width: 480px),(max-device-width: 480px)");
       if(mql.matches&&(flag==1)){
        var btn="<button id='backBtn'>Back</button>";
        $(document).on('click','#backBtn',function(){
              $(".tab").css("display","block");
              $("#dinosaraus").css("display","none");
              })
        $("#dinosaraus").append(btn);
        $(".tab").css("display","none");
        $("#dinosaraus").css("display","block");
        flag=0;
       }
       else{        
         $(".tab").css("display","block");
       }
// when screen width changes
    mql.addListener(function(changed) {
        if(changed.matches&&flag==1) {
            $(".tab").css("display","block");
            $("#dinosaraus").css("display","none");
            flag=0;     
        } 
        else {
            $(".tab").css("display","block");
            $("#dinosaraus").css("display","block");
            $("#backBtn").css("display","none");
            flag=1;
        }
    });
    },
// to store json data in states
    showResult: function(response) {
            this.setState({
                data: response
            });
            var item=this.state.data;
    },
//making ajax call to get data from server
    componentWillMount:function(){
        $.ajax({
            type:"GET",
            dataType:"json",
            url:"data/data.json",
            success: function(response) {
                this.showResult(response);
            }.bind(this)
             });
},
// rendering function for the class
        render: function() {
          var dinoName=Object.keys(this.state.data);
          var items = dinoName.map(function(a, i) {
            return (<li onClick={this.tabFunc.bind(this,i)} className="tabclass">{a}</li>);
          }, this);
            return (
            <div id="wrapper">
            <header className="heading col-sm-12 col-xs-12 col-lg-12 ">The World of Dinosaraus</header>
            <ul className="tab col-xs-12 col-lg-4 col-sm-4">
              {items}
            </ul>
            <div id="dinosaraus" className="col-xs-12 col-lg-8 col-sm-8"></div>
            <div className="clearFix"></div>
            </div>);
        }
});
// calling the rendering function
        ReactDOM.render(<DinoClass />, document.getElementById('container'));

