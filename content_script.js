class Sound {
    logout() {
        const sound = new Audio("https://soundeffect-lab.info/sound/anime/mp3/drum-japanese2.mp3")
        sound.play()
    }
}

class Meet {
    constructor() {
        this.sound = new Sound()
        this.count = 0

        const target = document.getElementById('root')
        const observer = new MutationObserver(value => {
            this.count = target
        })
        observer.observe(target, { characterData: true })
    }

    playSound() {
        this.sound.logout()
    }
}

class ObserveMeet {
    constructor() {
        this.meet = new Meet()
    }
    sleep(waitTime) {
        const startTime = new Date();
        while (new Date() - startTime < waitTime);
    }

    alerting(oldValu, newValue) {
        if (oldValu > newValue) {
            this.meet.sound.logout()
        }
    }

    watchValue() {
        let value = this.meet["count"];
        Object.defineProperty(this.meet, "count", {
            get: () => value,
            set: newValue => {
                const oldValue = value;
                value = newValue;
                this.alerting(oldValue, newValue);
            },
            configurable: true
        });
    }
}

const observer = new ObserveMeet()
observer.watchValue()