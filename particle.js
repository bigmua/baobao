let particleCount = 0  // 当前粒子数量
let particleSize = 2 // 粒子大小
let maxParticleLiveTime = 10 // 粒子存活时间秒钟
let particleList = []

class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.frameCount = 0 // 当前例子已存活帧
        this.opacity = 1 // 当前例子已存活帧
        // 计算移动方向
        let centerPoint = {x: width / 2, y: height / 2}
        this.dx = (x - centerPoint.x) / Math.sqrt(Math.pow(x - centerPoint.x, 2) + Math.pow(y - centerPoint.y, 2))
        this.dy = (y - centerPoint.y) / Math.sqrt(Math.pow(x - centerPoint.x, 2) + Math.pow(y - centerPoint.y, 2))
        if(Math.random()<0.5){
            this.dx = -this.dx
            this.dy = -this.dy
        }

    }
}


function drawParticle() {
    // 粒子生命管理  生成和销毁
    manageParticleLife()
    // 移动粒子
    moveParticle()
    // 绘制粒子
    drawParticles()
}


function manageParticleLife() {
    // 适当销毁粒子
    particleList.forEach(eachParticle => {
        eachParticle.frameCount++
    })
    particleList = particleList.filter(eachParticle => eachParticle.frameCount < maxParticleLiveTime * fps)

    // 粒子数量不足  生成粒子
    genParticles()
}

function genParticles() {
    for (let i = 0; i < heartPath.length; i++){
        let heartPoint = heartPath[i];
        let p = 0.02
        if ( Math.abs(heartPoint.x - width/2) < 5) {
            p =0.005
        }
        if(Math.abs(heartPoint.x - width/2) < 2) {
            p = 0
        }
        if (Math.random() < p) {
            // 在当前位置生成一个粒子
            particleList.push(new Particle(heartPoint.x, heartPoint.y))
        }
    }
}

function moveParticle() {
    particleList.forEach(eachParticle => {
        eachParticle.x = eachParticle.x + eachParticle.dx
        eachParticle.y = eachParticle.y + eachParticle.dy
        eachParticle.opacity = eachParticle.opacity * (1- eachParticle.frameCount / (maxParticleLiveTime* fps))
    })
}

function drawParticles() {
    particleList.forEach(eachParticle => {
        sketchContext.fillStyle = "rgba(231,76,60,"+eachParticle.opacity+")"
        sketchContext.fillRect(eachParticle.x, eachParticle.y, particleSize, particleSize)
    })
}
