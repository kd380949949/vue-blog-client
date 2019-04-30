//该文件内部内容要导出，故不可重名
    import Vue from 'vue'
    import axios from 'axios'
    //公共路径
    // let portUrl = "http://www.mangoya.cn/port/";
    let portUrl = "http://"+window.location.host+"/port/";
    //用户登录
    const UserLogin =  (email,password,callback) =>{
        let url = portUrl + 'login/UserLogin?email='+email+'&password='+password;
        axios.get(url).then(res => {
                callback && callback(res.data);
        })
    }
    //用户退出  向服务器请求的地址 portUrl + 'login/LoginOut?token='+token;
    const LoginOut = (token,callback) =>{
        let url = portUrl + 'login/LoginOut?token='+token;
        axios.get(url).then(res => {
                callback && callback(res.data);
        })
    }  
    //文章分类信息数据     向服务器请求的地址portUrl + 'article/ArtClassData'
    const ArtClassData = (callback) => {
        if(sessionStorage.getItem('classList')){ //检查本地是否有缓存  classList为本地缓存的名字
            var data = JSON.parse(sessionStorage.getItem('classList'));
            callback && callback(data)
        }else{  //本地没有从缓存，就向服务器端请求
            let url = portUrl + 'article/ArtClassData';//     向服务器请求的地址portUrl + 'article/ArtClassData'
            axios.get(url).then(res => {
                // console.log(num);
                if(res.data.code==1001){
                    sessionStorage.setItem('classList',JSON.stringify(num.data.data));
                    callback && callback(res.data.data)
                }else{
                    alert("查询失败")
                }
            })
        }
    }   
    //作品 列表项目    向服务器请求的地址portUrl + 'nav/navMenList'
    const navMenList  = (callback) => {
        if(sessionStorage.getItem('navMenList')){ //检查本地是否有缓存  navMenList为本地缓存的名字
            var data = JSON.parse(sessionStorage.getItem('navMenList'));
            callback && callback(data)
        }else{
            let url = portUrl + 'nav/navMenList';
            axios.get(url).then(res => {
                // console.log(num);
                if(res.data.code==1001){
                    sessionStorage.setItem('navMenList',JSON.stringify(res.data.data));
                    callback && callback(res.data.data)
                }else{
                    alert("查询失败")
                }
            })
        }
    }
    
    //查询文章列表
    const ShowArticleAll = (artId,classId,level,callback) =>{
        if(level == 1){//level用于控制是主页显示 还是分类显示列表
            var url = portUrl + 'nav/ActiveClassAllData?art_id='+artId+'&class_id='+classId;
        }else{
            var url = portUrl + 'article/ShowArticleAll?art_id='+artId+'&class_id='+classId;
        }
        axios.get(url).then(res => {
                callback && callback(res.data);
        })
    }
    
    //查询文章详情
                //detailObj={create_time: , 
                //           id: , 
                //           title: , 
                //           browse_count:浏览次数,
                //           comment_count：评论数，
                //          class_id:跳转到该类别,
                //           cate_name：类别的名字
                //          content：内容} 
    const getArticleInfo = (artId,userId,callback) =>{
        let url = portUrl + 'article/getArticleInfo?art_id='+artId+'&user_id='+userId;
        axios.get(url).then(res => {
            if(res.data.code==1001){
                callback && callback(res.data.data);
            }else{
                alert("查询失败");
            }
        })
    }
    
    //查询浏览量最多的10篇,文章数据浏览量  {id,count,browse_count}
    const ShowBrowseCount = (callback) =>{
        let url = portUrl + 'article/ShowBrowseCount';
        axios.get(url).then(num => {
            if(num.data.code==1001){
                callback && callback(num.data.data);
            }else if(num.data.code==1005){
                return;
            }else{
                alert("查询失败");
            }
        })
    }
    
    //查询文章评论数据portUrl + 'comment/ArticleComment?art_id='+artId+'&comment_id='+commentId;
    const ArticleComment = (artId,commentId,callback) =>{
        let url = portUrl + 'comment/ArticleComment?art_id='+artId+'&comment_id='+commentId;
        axios.get(url).then(num => {
                callback && callback(num.data);
        })
    }
    
    //查询其他评论数据   portUrl + 'comment/OtherComment?leave_id='+leaveId+'&comment_id='+commentId;
    const OtherComment = (leaveId,commentId,callback) =>{//分类类型ID（1：赞赏 2：友情链接 3：留言板 4：关于我）
        let url = portUrl + 'comment/OtherComment?leave_id='+leaveId+'&comment_id='+commentId;
        axios.get(url).then(num => {
            callback && callback(num.data);
        })
    }
    
    //文章评论 //文章评论  portUrl + 'comment/setArticleComment?content='+content+'&user_id='+user_id+'&article_id='+article_id+'&leave_pid='+leave_pid+'&pid='+pid;
    const setArticleComment = (content,user_id,article_id,leave_pid,pid,callback) =>{
        let url = portUrl + 'comment/setArticleComment?content='+content+'&user_id='+user_id+'&article_id='+article_id+'&leave_pid='+leave_pid+'&pid='+pid;
        axios.get(url).then(res => {
                callback && callback(res.data);
        })
    }
    
    //其他评论
    const setOuthComment = (content,user_id,article_id,leave_id,leave_pid,pid,callback) =>{
        let url = portUrl + 'comment/setOuthComment?content='+content+'&user_id='+user_id+'&article_id='+article_id+'&leave_id='+leave_id+'&leave_pid='+leave_pid+'&pid='+pid;
        axios.get(url).then(res => {
                callback && callback(res.data);
        })
    }
    
    //查询网址点赞总数  portUrl + 'outh/showLikeData'
    const showLikeData = (callback) =>{
        let url = portUrl + 'outh/showLikeData';
        axios.get(url).then(num => {
            if(num.data.code==1001){
                // console.log(num.data,parseInt(num.data));
                callback && callback(num.data.data);
            }else{
                alert("查询失败");
            }
        })
    }

    //右栏心形点赞功能，修改数量  portUrl + 'outh/GetLike?like_num='+like_num
    //              存到 服务器端  like_num
    //每点击一次 存一次
    const GetLike = (like_num,callback) =>{
        let url = portUrl + 'outh/GetLike?like_num='+like_num;
        axios.get(url).then(res => {
            if(res.data.code==1001){
                callback && callback(res.data.msg);
            }else{
                alert("点赞失败");
            }
        })
    }
    
    
    
    //查询关于我
    const AboutMeData = (callback) =>{
        if(sessionStorage.getItem('AboutMeData')){
            var data = JSON.parse(sessionStorage.getItem('AboutMeData'));
            callback && callback(data)
        }else{
            let url = portUrl + 'outh/AboutMeData';
            axios.get(url).then(res => {
                if(res.data.code==1001){
                    sessionStorage.setItem('AboutMeData',JSON.stringify(res.data.data));
                    callback && callback(res.data.data);
                }else if(res.data.code==1005){
                    return;
                }else{
                    alert("查询失败");
                }
            })
        }
    }
    
    //文章 点击喜欢
    const getArtLikeCollect = (userId,artId,callback) =>{
        var url = '';
        
            url = portUrl + 'article/getArtLike?user_id='+userId+'&art_id='+artId; //向服务器发送请求，点赞文章
        
         
        axios.get(url).then(res => {
            if(res.data.code==1001){
                callback && callback(res.data.msg);
            }else{
                alert("查询失败");
            }
        })
    }
    
    //查询赞赏数据
    //查询赞赏数据   portUrl + 'outh/AdmireData' 
    //{ data: 赞赏二维码 {wechat_image:地址字符串,alipay_image：地址字符串},
    //  admire_code: [{ 赞赏数据pay_time: '2016-05-02', name: '王小虎',money: '555'},]，
    //  code:1001
    // } 
    const AdmireData = (callback) => {
        let url = portUrl + 'outh/AdmireData';
        axios.get(url).then(res => {
            if(res.data.code==1001){
                callback && callback(res.data);
            }else{
                alert("查询失败");
            }
        })
    }
    
    //查询用户喜欢列表
    const getLikeCollectList = (userId,artId,articleName,callback)=>{
        var url = '';
       
             url = portUrl + 'article/getLikeList?user_id='+userId+'&art_id='+artId+'&article_name='+articleName;
        
        axios.get(url).then(res => {
                callback && callback(res.data);
        })
    }
    
    //查询用户信息
    const getUserInfo = (userId,callback)=>{
        let url = portUrl + 'Userinfo/getUserInfo?user_id='+userId;
        axios.get(url).then(res => {
            if(res.data.code==1001){
                callback && callback(res.data);
            }else{
                alert("查询失败");
            }
        })
    }

    //修改用户信息
    const UserInfoSave = (obj,callback) =>{
        let url = portUrl + 'Userinfo/UserInfoSave';
        var data = {
            'username':obj.username,
            'user_img':obj.avatar,
            'email':obj.email,
            'sex':obj.sex,
            'friend_start':obj.state,
            'user_id':obj.user_id,
            'frie_name':obj.name,
            'frie_url':obj.url,
            'frie_description':obj.description,
            'friend_img':obj.image,
            'label':obj.label,
            'head_start':obj.head_start,
            'logo_start':obj.logo_start
        };
        // console.log(data);
        axios.get(url,{params:data}).then(res => {
            if(res.data.code==1001){
                callback && callback(res.data.msg);
            }else{
                alert("保存失败");
            }
        })
    }
    
    //初始化时间   
    //   传入时间 做相应的处理
    //   full来控制输出的样式结果
    //   full=='all','year','month','date','newDate'
    const initDate = (oldDate,full) => {
        var odate = new Date(oldDate);
        var year =  odate.getFullYear();
        var month = odate.getMonth()<9? '0' + (odate.getMonth()+1) : odate.getMonth()+1;
        var date = odate.getDate()<10? '0'+odate.getDate() : odate.getDate();
        if(full=='all'){
            var t = oldDate.split(" ")[0];
            // console.log(oldDate,t.split('-')[0],t.split('-')[1],t.split('-')[2]);
            return t.split('-')[0]+'年'+t.split('-')[1]+'月'+t.split('-')[2]+'日';
        }else if(full=='year'){
            return year
        }else if(full== 'month'){
            return odate.getMonth()+1
        }else if(full == 'date'){
            return date
        }else if(full== 'newDate'){
            return year+'年'+month+'月'+date+'日';
        }
    }
    
    //获取主题信息
    const changeTheme = (callback) => {
        if(sessionStorage.getItem('changeThemeObj')){
            var data = JSON.parse(sessionStorage.getItem('changeThemeObj'));
            callback && callback(data)
        }else{
            let url = portUrl + 'outh/ThemeMy';
            axios.get(url).then(num => {
                if(num.data.code==1001){
                    sessionStorage.setItem('changeThemeObj',JSON.stringify(num.data.data))
                    callback && callback(num.data.data);
                }else{
                    alert("查询失败");
                }
            })
        }
    }
    
    export {
            
            UserLogin,//登录
            LoginOut,//退出登录
            ArtClassData,//分类
            navMenList,//作品 列表项目
            ShowArticleAll,//查询文章列表
            getArticleInfo,//文章详情
            ShowBrowseCount,//流量量做多的文章
            
            ArticleComment,//文章评论列表
            OtherComment,//其他评论列表
            setArticleComment,//设置文章评论
            setOuthComment,//设置其他评论
            showLikeData,//do you like me
            GetLike,//设置 do you like me
            
            AboutMeData,//关于我文章编写
            getArtLikeCollect,// 文章点赞
            AdmireData,//赞赏数据
            getLikeCollectList,//用户喜欢列表
            getUserInfo,//用户信息查询
            UserInfoSave,//修改用户信息
            initDate,//设置时间
            changeTheme,//获取主题信息
        }
    
