class MineIncharge {
    constructor({
      name,
      password,
      id,
      email,
      phone,
      mineIDs = [],
      shiftInchargeIDs = [],
      mineLocations = [],
    }) {
      this.name = name;
      this.password = password;
      this.id = id;
      this.email = email;
      this.phone = phone;
      this.mineIDs = mineIDs; // Array of mine IDs
      this.shiftInchargeIDs = shiftInchargeIDs; // Array of shift incharge IDs
      this.mineLocations = mineLocations; // Array of mine locations
    }
  
    // Convert to JSON for Firestore
    toJson() {
      return {
        name: this.name,
        password: this.password,
        id: this.id,
        email: this.email,
        phone: this.phone,
        mineIDs: this.mineIDs,
        shiftInchargeIDs: this.shiftInchargeIDs,
        mineLocations: this.mineLocations,
      };
    }
  
    // Static method to create a MineIncharge instance from Firestore data
    static fromSnapshot(snapshot) {
      const data = snapshot.data();
      return new MineIncharge({
        name: data.name,
        password: data.password,
        id: data.id,
        email: data.email,
        phone: data.phone,
        mineIDs: data.mineIDs,
        shiftInchargeIDs: data.shiftInchargeIDs,
        mineLocations: data.mineLocations,
      });
    }
  }
  
  module.exports = MineIncharge;
  