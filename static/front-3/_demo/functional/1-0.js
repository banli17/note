var Flock = function(n) {
this.seagulls = n;
};

Flock.prototype.conjoin = function(other) {
this.seagulls += other.seagulls;
return this;
};

Flock.prototype.breed = function(other) {
this.seagulls = this.seagulls * other.seagulls;
return this;
};

var flock_a = new Flock(4);
var flock_b = new Flock(2);
var flock_c = new Flock(0);

var result = flock_a.conjoin(flock_c).breed(flock_b).conjoin(flock_a.breed(flock_b)).seagulls;

console.log(result)
