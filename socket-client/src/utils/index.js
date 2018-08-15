export default {
    createNewNot(title,avatar,text){
        let not = new Notification(title, {
            body: text,
            icon: avatar,
            tag: 'span',
            renotify: true,
        })
        not.onclick = () => not.close()
        setTimeout(()=>{
            not.close()
        }, 1000)
    }
}