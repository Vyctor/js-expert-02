class SocketBuilder {
  constructor({ socketUrl }) {
    this.socketUrl = socketUrl;
    this.onUserConnected = () => {};
    this.onUserDisconnected = () => {};
  }

  setOnUserConnected(fn) {
    this.onUserConnected = fn;
    return this;
  }

  setOnUserDisconnected(fn) {
    this.onUserDisconnected = fn;
    return this;
  }

  build() {
    const socket = io.connect(this.socketUrl, {
      withCredentials: false,
    });

    socket.one("user-connected", this.onUserConnected);
    socket.one("user-disconnected", this.onUserDisconnected);

    return socket;
  }
}
