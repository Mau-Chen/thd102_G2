export default{template:`
        <button type="button">登入</button>
    `,methods:{async postData(){try{var t=await(await fetch("php_url",{method:"POST",headers:{"Content-Type":"application./json"},body:JSON.stringify({param1:"value1",param2:"value2"})})).json();console.log(t)}catch(t){console.error(t)}}}};