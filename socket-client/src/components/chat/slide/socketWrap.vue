<template>
    <div>
        <div class="chat_item slide-left" v-for="" @click="">
            <div class="ext">
                <p class="attr"></p>
                <p class="no_time">
                    <i class="web_wechat_no_remind" :class="{web_wechat_no_remind_hl: ''}"></i>
                </p>
            </div>
            <div class="avatar">
                <img class="img" src="">
            </div>
            <div class="info">
                <h3 class="nickname">
                    <span class="nickname_text" v-text=""></span>
                </h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>


<style lang="less" scoped>
.chat_item{
    overflow: hidden;
    padding: 12px 18px 11px;
    border-bottom: 1px solid rgb(41, 44, 51);
    cursor: pointer;
    position: relative;
    .ext{
        float: right;
        color: rgb(107, 111, 124);
        font-size: 13px;
        text-align: right;
        .attr{
            height: 19px;
            line-height: 1.5;
        }
    }
    .avatar{
        float: left;
        margin-right: 10px;
        position: relative;
        .img{
            display: block;
            width: 40px;
            height: 40px;
            border-radius: 2px;
        }
    }
    .info{
        overflow: hidden;
        .nickname{
            font-weight: 400;
            font-size: 13px;
            color: rgb(255, 255, 255);
            line-height: 20px;
            .nickname_text{
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
                display: inline-block;
                vertical-align: top;
            }
        }
    }
}
.chat_item.active{
    background: rgb(58, 63, 69);
    .ext,.info,.msg{
        color: rgb(255, 255, 255);
    }
}

.web_wechat_no_remind{
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    background: url('../../../assets/icon.png') no-repeat;
    background-position: -401px -357px;
    background-size: 487px 462px;
}
.web_wechat_no_remind_hl{
    background-position: -311px -432px;
    background-size: 487px 462px;
}


</style>

