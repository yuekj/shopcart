
import flyCart from '../../utils/flyCart'

const app = getApp();
Component({
    properties: {
        /* 当前 x ,y 值 */
        current: {
            type: Object,
            value: {}
        },
        /* 图片 url  */
        imageUrl:{
            type:String,
            value:''
        },
        name:{
            type:String,
            value:""
        }
    },
    data: {
        bus_x:0, /* left */
        bux_y:0, /* top */
        cartHidden:true, /* 控制购物车图片显示与隐藏 */
        scale:1 /* 缩放比 */
    },
   
    attached(e) {
        this.end={
            x:375 * 1 /5,
            y:600
        }
        /* 获取屏幕宽高 */
        const windowWidth = wx.getSystemInfoSync().windowWidth
        const windowHeight = wx.getSystemInfoSync().windowHeight
        console.log(windowHeight)
        console.log(windowWidth)
        /* 购物车所在的位置 */
        this.end['y'] = windowHeight - 20
        this.end['x'] = windowWidth * 1 / 5 -50
        console.log(this.end)
        this.startCart()
    },
    methods: {
        startCart(){
            /* 开启购物车 */
            /* this.start 储存起始点 clientY clientY  ,this.end储存最终点 clientX clientY */
            console.log("当前坐标")
            console.log(this.data.current)
            this.start = {}
            this.start['x'] = this.data.current['x']
            this.start['y'] = this.data.current['y']
            console.log(this.start)
            const travelList = flyCart([ this.start['x'] , this.start['y'] ] ,[ this.end['x'] , this.end['y'] ],25,50 )
            this.startAnimation(travelList)
        },
        startAnimation(travelList) {
            let index = 0
            this.setData({
                cartHidden: false,
                bus_x: this.start['x'],
                bus_y: this.start['y']
            })
            if(travelList.length===0) return
            this.timer = setInterval( ()=> {
                index++
                const currentPoint = travelList.shift()
                this.setData({
                    bus_x: currentPoint[0],  /* left 值 */
                    bus_y: currentPoint[1],  /* top值 */
                    scale: 1 - index / 25    /* 缩放比 */
                })
                if (travelList.length === 0) {
                    clearInterval(this.timer)
                    this.triggerEvent('close')
                    app.getPrepPage().setData({
                        aniStart:false
                    })
                }
            }, 33)
        }
    }

})