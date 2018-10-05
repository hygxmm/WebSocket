<template>
    <div id="app">
        <div class="wrap">
            <canvas class="bg" width="320" height="320"></canvas>
            <div class="box">
                <div v-for="(row,rowIndex) in list">
                    <div class="dot" :class="[col === 1 ? 'white': '',col === 2 ? 'black' : '' ]" v-for="(col,colIndex) in row" @click="handleDown(rowIndex,colIndex,col)"></div>
                </div>
            </div>
            <dialog ref="dialog">{{party}}胜利!游戏结束!</dialog>
        </div>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            list: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            nowColor: 1,//white: 1 black: 2
            party: null
        };
    },
    methods: {
        init() {
            const canvas = document.querySelector('.bg');
            const ctx = canvas.getContext('2d');
            ctx.strokeStyle = '#999';
            for(let i=0;i<=16;i++){
                ctx.moveTo(0,i*20);
                ctx.lineTo(320,i*20);
                ctx.stroke();
                ctx.moveTo(i*20,0);
                ctx.lineTo(i*20,320);
                ctx.stroke();
            }
        },
        handleDown(rowIndex,colIndex,col){
            if(col !== 0) return;
            this.$set(this.list[rowIndex],colIndex,this.nowColor)

            //判断是否胜利
            this.isWin(rowIndex,colIndex)

            // 变换落子方
            if(this.nowColor === 1){
                this.nowColor = 2
            }else{
                this.nowColor = 1
            }

        },
        //判断输赢
        isWin(rowIndex,colIndex){
            this.party = this.nowColor === 1 ? '白子' : '黑子';
            console.log(this.party)
            //横向对比
            const rowWin = this.rowCompare(rowIndex,colIndex);
            if(rowWin){
                this.$refs.dialog.showModal()
                // alert(`${party}胜出!游戏结束!`)
                return ;
            }
            //纵向对比
            const colWin = this.colCompare(rowIndex,colIndex);
            if(colWin){
                this.$refs.dialog.showModal()
                // alert(`${party}胜出!游戏结束!`)
                return ;
            }
            //斜向对比
            const slantWin = this.slantCompare(rowIndex,colIndex);
            if(slantWin){
                this.$refs.dialog.showModal()
                // alert(`${party}胜出!游戏结束!斜向判断`)
                return ;
            }
            //反斜向对比
            const unSlantWin = this.unSlantCompare(rowIndex,colIndex);
            if(unSlantWin){
                this.$refs.dialog.showModal();
                // alert(`${party}胜出!游戏结束!反斜向判断`)
                return ;
            }

        },
        //横向对比
        rowCompare(rowIndex,colIndex){
            let arr = [[rowIndex,colIndex]];
            for(let i=1;i<5;i++){
                arr.unshift([rowIndex,colIndex - i])
            }
            for(let i=1;i<5;i++){
                arr.push([rowIndex,colIndex + i])
            }
            const arr1 = arr.map(item => {
                if(!this.list[item[0]][item[1]]) return 0;
                return  this.list[item[0]][item[1]]
            })
            if(arr1.join('').includes(this.nowColor.toString().repeat(5))){
                return true
            }else{
                return false
            }
        },
        //纵向对比
        colCompare(rowIndex,colIndex){
            let arr = [[rowIndex,colIndex]];
            for(let i=1;i<5;i++){
                arr.unshift([rowIndex - i,colIndex])
            }
            for(let i=1;i<5;i++){
                arr.push([rowIndex + i,colIndex])
            }
            const arr1 = arr.map(item => {
                if(!this.list[item[0]]) return 0;
                return  this.list[item[0]][item[1]]
            })
            if(arr1.join('').includes(this.nowColor.toString().repeat(5))){
                return true
            }else{
                return false
            }
        },
        //斜向对比
        slantCompare(rowIndex,colIndex){
            let arr = [[rowIndex,colIndex]];
            for(let i=1;i<5;i++){
                arr.unshift([rowIndex - i,colIndex - i])
            }
            for(let i=1;i<5;i++){
                arr.push([rowIndex + i,colIndex + i])
            }
            const arr1 = arr.map(item => {
                if(!this.list[item[0]]) return 0;
                return  this.list[item[0]][item[1]]
            })
            if(arr1.join('').includes(this.nowColor.toString().repeat(5))){
                return true
            }else{
                return false
            }
        },
        //反斜向对比
        unSlantCompare(rowIndex,colIndex){
            let arr = [[rowIndex,colIndex]];
            for(let i=1;i<5;i++){
                arr.unshift([rowIndex - i,colIndex + i])
            }
            for(let i=1;i<5;i++){
                arr.push([rowIndex + i,colIndex - i])
            }
            console.log(arr,"-------")
            const arr1 = arr.map(item => {
                if(!this.list[item[0]]) return 0;
                return  this.list[item[0]][item[1]]
            })
            if(arr1.join('').includes(this.nowColor.toString().repeat(5))){
                return true
            }else{
                return false
            }
        }
    },
    mounted(){
        this.init()
    }
};
</script>

<style>
html,
body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
#app {
    width: 100%;
    height: 100%;
    background-color: blanchedalmond;
    position: relative;
}
.wrap{
    width: 320px;
    height: 320px;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
}

.box{
    width: 300px;
    height: 300px;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
}
.box > div {
    width: 100%;
    height: 20px;
}

.dot {
    width: 14px;
    height: 14px;
    margin: 3px;
    border-radius: 7px;
    float: left;
}
.white{
    background-color: white;
}
.black{
    background-color: black;
}

</style>
