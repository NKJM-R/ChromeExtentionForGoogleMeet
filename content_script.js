const SOUND_CONFIG = "./sound.json";
const MEET_CONFIG = "./meet.json";
const LOGOUT = "LOGOUT";
const TAIKO = "https://soundeffect-lab.info/sound/anime/mp3/drum-japanese2.mp3";

class Sound {
  constructor(source) {
    // 音源
    this.source = source;
  }
  play() {
    new Audio(this.source).play();
  }
}

class Meet {
  constructor() {
    this.USER_COUNT_ELEMENT = "wnPUne N0PJ8e";

    this.sounds = {};
    this.observers = {};
    this.userCount = 0;
  }

  setSound(name, source) {
    this.sounds[name] = new Sound(source);
  }

  playSound(name) {
    this.sounds[name].play();
  }

  syncUserCount(stop = false) {
    stop
      ? this._syncStop(this.USER_COUNT_ELEMENT)
      : this._syncStart(this.USER_COUNT_ELEMENT, this._setUserCount);
  }

  _setUserCount = (element) => (this.userCount = element[0].target.innerHTML);
  _syncStop = (name) => this.observers[name].disconnect();

  _syncStart(className, fc) {
    const element = document.getElementsByClassName(className)[0];
    this.observers[className] = new MutationObserver((records) => {
      fc(records);
    });
    this.observers[className].observe(element, {
      childList: true,
      characterData: true,
    });
  }

  _executeElementPropaty(element, propaty) {}
}

class EventObserver {
  constructor(meet) {
    this.meet = meet;
  }

  run() {
    const userCount = "userCount";
    this.propsWatch(userCount);
  }

  eventSwitcher(newValue, propaty) {
    console.log(this.meet);
    console.log(propaty);
    const oldValue = this.meet[propaty];
    if (oldValue > newValue) this.meet.playSound(LOGOUT);
  }

  propsWatch(propaty) {
    let value = this.meet[propaty];
    Object.defineProperty(this.meet, propaty, {
      get: () => value,
      set: (newValue) => {
        this.eventSwitcher(newValue, propaty);
      },
      configurable: true,
    });
  }
}

class GoogleMeetExtention {
  constructor(meet, observer) {
    this.isRunning = false;
    this.meet = meet;
    this.observer = observer;
    this.behavior = {
      UP: () => this.up(),
      DOWN: () => this.down(),
    };
  }

  up() {
    if (this.isStarted) return "Already running";
    this.meet.syncUserCount();
    this.observer.run();
    this.isRunning = true;
    return "Running";
  }

  down() {
    if (!this.isStarted) return "Not running";
    const stop = true;
    this.meet.syncUserCount(stop);
    this.observer.run();
    this.isRunning = false;
    msg = "Stopped";
    return msg;
  }

  waitForOrder() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>
      this._listener(request, sender, sendResponse)
    );
  }

  _listener(request, sender, sendResponse) {
    const order = request.message;
    const msg = this.behavior[order]();
    sendResponse(msg);
  }
}

const meet = new Meet();
meet.setSound(LOGOUT, TAIKO);

const observer = new EventObserver(meet);

gme = new GoogleMeetExtention(meet, observer);
gme.waitForOrder();
