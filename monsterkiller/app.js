new Vue({
    el: "#app",
    data:{
        mainMenu: true,
        playerHealth: 100,
        monsterHealth: 100,
        history: [],        
        cooldownTimer: 0,
        turnCount: 0
    },
    
    methods: {
        attack() {
            this.turnCount++
            this.monsterAttack()
            const playerHit = this.calculateEffect(3, 10)          
            this.monsterHealth -= playerHit    
            this.history.unshift({isPlayer: true, text:"Player hits monster for " + playerHit, id: this.turnCount})
            this.cooldownTimer -= 1
            this.checkStatus()
        },
        specialAttack(){
            this.turnCount++
            if(!this.onCooldown){
                this.monsterAttack()
                const playerHit = this.calculateEffect(10, 20)          
                this.monsterHealth -= playerHit    
                this.history.unshift({isPlayer: true, text:"Player unleashes their fury for " + playerHit + " damage!", id: this.turnCount, special: true})
                this.cooldownTimer = 5
                this.checkStatus()
            }
        },
        heal() {
            this.turnCount++
            this.monsterAttack()
            this.checkStatus()
            if(!this.mainMenu){
                const playerHeal = this.calculateEffect(5, 30)
                if(this.playerHealth + playerHeal >= 100){
                    this.history.unshift({isPlayer: true, text:"Player heals for " + (100 - this.playerHealth), id: this.turnCount, isHeal: true})
                    this.playerHealth = 100
                } else {
                    this.playerHealth += playerHeal   
                    this.history.unshift({isPlayer: true, text:"Player heals for " + playerHeal, id: this.turnCount, isHeal: true})
                }
                this.cooldownTimer -= 1
            }
        },
        surrender() {
            this.mainMenu = true,
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.history = [],
            this.cooldownTimer = 0
        },
        monsterAttack(){
            const monsterHit = this.calculateEffect(5, 20)
            this.playerHealth -= monsterHit
            this.history.unshift({isPlayer: false, text:"Monster hits player for " + monsterHit, id: this.turnCount})
        },
        checkStatus(){
            if(this.monsterHealth <= 0){
                alert('You beat the horrible monster! Yaay. Click OK to restart')
                this.surrender()
            }
            if(this.playerHealth <= 0){
                alert('You died. The village will soon follow. Click OK to restart')
                this.surrender()
            }
        },
        calculateEffect(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        }
        
    },
    computed: {
        onCooldown(){
            if(this.cooldownTimer <= 0)
                return false
            else
                return true
        }
    }
})