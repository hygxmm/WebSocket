<template>
    <div class="box_hd">
        <div id="chatRoomMembersWrap">
            <div v-if="false" class="mmpop ng-scope members_wrp slide-down" tabindex="-1" style="">
                <div class=" members">
                    <div class="members_inner ng-scope">
                        <div class="member">
                            <img class="avatar" src="" alt="" title="" />
                            <p class="nickname ng-binding"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="title_wrap">
            <div class="title poi">
                <a class="title_name ng-binding"></a>
                <i class="web_wechat_down_icon"></i>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.box_hd{
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    line-height: 30px;
    .title_wrap{
        position: relative;
        padding: 10px 0;
        margin: 0 19px;
        border-bottom: 1px solid #d6d6d6;
        background-color: #eee;
        z-index: 1024;
        .title{
            font-weight: 400;
            height: 25px;
            display: inline-block;
            font-size: 14px;
            cursor: pointer;
            .title_name{
                display: inline-block;
                vertical-align: middle;
                max-width: 300px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
                text-decoration: none;
                color: #000;
                font-weight: 400;
            }
            .web_wechat_down_icon{
                display: inline-block;
                vertical-align: middle;
                width: 10px;
                height: 10px;
                background: url('../../../assets/icon.png') no-repeat;
                background-position: -477px -65px;
                -webkit-background-size: 487px 462px;
                background-size: 487px 462px;
            }
        }
    }
}
.mmpop{
    position: absolute;
    background-color: #fff;
    z-index: 99;
    top: 0;
    left: 0;
    outline: none;
}
.members_wrp{
    top: 50px;
    margin-top: 1px;
    box-shadow: 1px 1px 1px #e0e0e0;
    -moz-box-shadow: 1px 1px 1px #e0e0e0;
    -webkit-box-shadow: 1px 1px 1px #e0e0e0;
    width: 100%;
}

.slide-down{
    -webkit-transition: all 0 cubic-bezier(.25,.46,.45,.94);
    transition: all 0 cubic-bezier(.25,.46,.45,.94);
    -webkit-transition-timing-function: cubic-bezier(.25,.46,.45,.94);
    transition-timing-function: cubic-bezier(.25,.46,.45,.94);
}
.members{
    padding: 10px 4px 8px 17px;
    background-color: #eee;
    border-bottom: 1px solid #dedede;
}
.members_inner{
    margin-right: -4px;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
}
.member{
    float: left;
    position: relative;
    height: 85px;
    margin-right: 7px;
    margin-left: 7px;
    padding-top: 10px;
    .avatar{
        display: block;
        cursor: pointer;
        width: 55px;
        height: 55px;
        background-color: #ccc;
    }
    .nickname{
        color: #888;
        width: 72px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        font-size: 12px;
        margin-left: -8px;
        vertical-align: middle;
    }
}
</style>

