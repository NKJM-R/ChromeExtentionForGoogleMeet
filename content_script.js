class Sound {
  constructor(source) {
    // 音源
    this.source = source;
  }
  play() {
    Audio(this.source).play();
  }
}

class Person {
  constructor() {
    this.name = null;
    this.image = null;
  }
}

class Meet {
  constructor() {
    this.sounds = {};
    this.people = [];
    this.events = ["LOGOUT"];
  }

  addMember(member) {
    this.members.push(member);
  }

  setSound(name, source) {
    this.sound[name] = new Sound(source);
  }

  playSound(name) {
    this.sounds[name].play();
  }

  logout(soundName) {
    this.playSound(soundName);
  }
}

class EventObserve {
  constructor(meet) {
    this.meet = meet;
  }
  run() {
    // @TODO: 考慮の余地あり
    // this.enventWatch();
  }

  eventPerception() {
    if (false) this.eventLogin();
    if (false) this.eventLogout();
  }

  eventLogout() {}

  eventLogin() {}

  // @TODO: 考慮の余地あり
  eventWatch(propaty) {
    let value = this.meet[propaty];
    Object.defineProperty(this.meet, propaty, {
      get: () => value,
      set: () => {},
      configurable: true,
    });
  }
}

const meet = new Meet();
const observer = new EventObserve(meet);
observer.run();
