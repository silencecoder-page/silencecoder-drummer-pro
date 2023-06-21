// Florecent Light ---------------------------------------------------------------------------

class florencentLight {

    constructor(){
        this.currentBulb = 1
        this.lastBulb = 16
        this.allIntervals = []
        this.lightInterval = 500
    }


    startDigitalLight(){
        let currentBulb = this.currentBulb
        let lastBulb = this.lastBulb
        let lightInterval = this.lightInterval
        let allIntervals = this.allIntervals

        let colors = [

        ] 
        let addLight =()=>{
            $(`#lightBorder-${currentBulb}`
            )[0].classList.add(`lit-border-${currentBulb}`)
            $(`#lightBulb-${currentBulb}`
            )[0].classList.add(`lit-bg-${currentBulb}`)
        }
        let removeLight=()=>{
            $(`#lightBorder-${currentBulb}`
            ).removeClass(`lit-border-${currentBulb}`)
            $(`#lightBulb-${currentBulb}`
            ).removeClass(`lit-bg-${currentBulb}`)}
        // eventlistener
        let eventID = window.setInterval(function(){
            window.setTimeout(addLight,lightInterval) 
            removeLight()
            currentBulb++ // move to next light 
            if (currentBulb === lastBulb + 1){currentBulb=1}  
        }, lightInterval)

        allIntervals.push(eventID)
        console.log(this.allIntervals)
    }

    digitalBoxlight = (elem) => {
        let lit = () => {
            elem.classList.add('box-play-bg')
            elem.children[0].classList.add('box-play-main-bg')
            // elem.style.backgroundColor = 'pink'
        } 
        window.setTimeout(function()
        {
            elem.classList.remove('box-play-bg')
            elem.children[0].classList.remove('box-play-main-bg')
            // elem.style.backgroundColor = '#1f1f55'
        },this.lightInterval)

        // Turn on Light
        lit()
    }


    digitalLightReset(){
        this.allIntervals.forEach(function(iD){
            console.log('light reset id', iD)
            console.log(iD)
            clearInterval(iD)
        })
        this.allIntervals = []
    }
}


// Play Engine ---------------------------------------------------------------------------

class playEngine {

    constructor (){
        this.allEvents = []
        this.trackValues = []
        this.playTimeout = 1000
        this.trackOne = 0
        this.trackTwo = 0
        this.trackThree = 0
        this.trackFour = 0
        this.trackFive = 0
        this.light = new florencentLight()
    }

    getUpdate(){
        let getChildren = this.trackValues
        // GET SOURCE
        let found = []
        $('.track').each(function(e){
            let currentTrack = $('.track')[e]
            let trackChildren = currentTrack.children
            found.push(trackChildren)
        })
        return found
    }

    startLoop(nodeList,counter){
        let addEvents = this.allEvents
        let getPlayTime = this.playTimeout
        let thisInterval;
        let playAudio = new Audio()
        

        const getElement=(elem)=>{
            let elemContent = elem.children[0]
            if (elemContent === undefined){}
            else{

                let sourceValue = elemContent.getAttribute('data-value')
                // add audio
                playAudio.src = sourceValue
                // Light Up
                this.light.digitalBoxlight(elem)
                playAudio.play()
            }

        }
        const playLoop=()=>{
            getElement(nodeList[counter])
            counter++
            if (counter===nodeList.length){counter=1}
        }
        // add Interval
        thisInterval = window.setInterval(playLoop,getPlayTime)
        addEvents.push(thisInterval)
        this.light.startDigitalLight()
    }


    // Reset Interval or Puse function
    resetloop(){

        // reset light
        this.light.digitalLightReset()

        if (this.allEvents.length > 0)
        {   
            
            this.allEvents.forEach(function(iD){
                clearInterval(iD)
            })

            // reset vals
            this.trackOne = 1
            this.trackTwo = 1
            this.trackThree = 1
            this.trackFour = 1
            this.trackFive = 1
            // reset allevents
            this.allEvents = []
        }
  
    }


    play(){

        console.log(this.playTimeout)

        // reset current playing
        this.resetloop()
        // get Update
        let currentUpdate = this.getUpdate()
        switch (currentUpdate.length) 

        {
            case 1: this.startLoop(currentUpdate[0],this.trackOne);
                    console.log('useing one worker'.toLocaleUpperCase());
                    break;

            case 2: this.startLoop(currentUpdate[0],this.trackOne);
                    this.startLoop(currentUpdate[1],this.trackTwo);
                    console.log('useing two workers'.toLocaleUpperCase());
                    break;
            
            case 3: this.startLoop(currentUpdate[0],this.trackOne);
                    this.startLoop(currentUpdate[1],this.trackTwo);
                    this.startLoop(currentUpdate[2],this.trackThree);
                    console.log('useing three workers'.toLocaleUpperCase());
                    break;
            
            case 4: this.startLoop(currentUpdate[0],this.trackOne);
                    this.startLoop(currentUpdate[1],this.trackTwo);
                    this.startLoop(currentUpdate[2],this.trackThree);
                    this.startLoop(currentUpdate[3],this.trackFour);
                    console.log('useing four workers'.toLocaleUpperCase());
                    break;
                
            case 5: this.startLoop(currentUpdate[0],this.trackOne);
                    this.startLoop(currentUpdate[1],this.trackTwo);
                    this.startLoop(currentUpdate[2],this.trackThree);
                    this.startLoop(currentUpdate[3],this.trackFour);
                    this.startLoop(currentUpdate[4],this.trackFive);
                    console.log('useing five workers'.toLocaleUpperCase());
                    break;
                    
            default : { // get light on // lightUp()
            }

        }

    }
}

// Generate Pads -------------------------------------------------------------------------

class GeneratePadsAndBoxes {

    constructor(){

        this.mediaContainers = medaiStorage.mediaContainers
        
        this.allMedia = medaiStorage.allMedia
    }


    createContainsers = () => {

        // Create Beat Pads
        const createContanierContents = (containernName) => {
    
            let seclectGroup = $('.beat-select-main')[0]
    
            let mainContainerDiv = document.createElement('div')
            mainContainerDiv.classList.add('beat-select')
            mainContainerDiv.setAttribute('id', `${containernName.replaceAll(' ', '')}`)
    
            // Create Media Pads
            for (let mediaName of this.allMedia[containernName]) {
    
                let mainDiv = document.createElement('div')
                mainDiv.classList.add('beat-pad')
                mainDiv.classList.add('button')
                mainDiv.setAttribute('draggable', 'true')
                mainDiv.setAttribute('data-value', `media/${containernName}/${mediaName}`)
                mainDiv.setAttribute('id', `${mediaName.replaceAll(' ', '')}`)
                // span
                let childSpan = document.createElement('span')
                childSpan.innerText = mediaName.slice(0,-4)
                mainDiv.appendChild(childSpan)
                // Add To Main 
                mainContainerDiv.appendChild(mainDiv)
            }
            // add maindiv
            seclectGroup.appendChild(mainContainerDiv)
    
            if (this.mediaContainers[0]===containernName){}
            else{$(mainContainerDiv).css('display','none')}
        }
        // ---------------------------------------------------------------------------
    
        // Create Containers
        for (let container of this.mediaContainers) {
        let containserDiv = document.createElement('div')
        containserDiv.classList.add('beat-container')
        containserDiv.classList.add('button')
        // span
        let contanierspan = document.createElement('span')
        contanierspan.innerText = container
        // append span
        containserDiv.appendChild(contanierspan)
    
        // Create Meda Pads
        createContanierContents(container)
        // append to document
        let seclectGroup = $('.group-select')[0]
        seclectGroup.appendChild(containserDiv)
    }     
    }
}


// Generate Drag Events ----------------------------------------------------------------

class DragEvents {

    constructor(){
        this.dragedPad = null;
        this.beatPad = null;
        this.trackBox = null;
    }

    getElements (){
        this.beatPad = document.querySelectorAll('.beat-pad')
        this.trackBox = document.querySelectorAll('.track-box')
        this.audio = new Audio()
    }

    dragCatch(){
        let dragedPad = this.dragedPad

        // getElements
        this.getElements()

        // Drum Pad
        for (let dragPad of this.beatPad) {
    
            dragPad.addEventListener('dragstart', function(e){
                // change size drag box size
                dragedPad = this
            })
    
            dragPad.addEventListener('dragend', function(e){
                })
    
            // Click
            dragPad.addEventListener('click', function(e){
                let audio = new Audio()
                let src = this.getAttribute('data-value')
                // set audio source
                audio.setAttribute('src', src)
                audio.setAttribute("type","audio/wav")
                audio.play()
                audio.volume = 1
                })
    
        }
    
        // Drum Track
        for (let dragBox of this.trackBox) {
    
            dragBox.addEventListener('dragenter', function(e){
                    e.preventDefault()
                    this.classList.add('pad-drag-over')
            })
    
            dragBox.addEventListener('dragover', function(e){
                    e.preventDefault()
                    this.classList.add('pad-drag-over')
            })
    
            dragBox.addEventListener('dragleave', function(e){
                    e.preventDefault()
                    this.classList.remove('pad-drag-over')
            })
    
            dragBox.addEventListener('drop', function(e){
    
                    // Box Template
                    const boxTemplate =(e)=> {
                        let objText = e.textContent
                        let objData = e.getAttribute('data-value')
                        let objid = e.getAttribute('id')

                        let template = `
                        <div class="pad-added" data-value="${objData}"
                        source-pad-id="${objid}">
                        <span>${objText}</span></div>`
                        return template
                    }

                this.innerHTML=boxTemplate(dragedPad)
                // remove effect class
                this.classList.remove('pad-drag-over') 
                })
    
            dragBox.addEventListener('dblclick', function(e) { 
                // Remove Track Pad Elements
                this.innerHTML = ''
            })

    
        }   
    }


}
