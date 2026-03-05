import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

actor {
  type Order = {
    id : Nat;
    fullName : Text;
    instagramUsername : Text;
    packageName : Text;
    postLink : Text;
    timestamp : Time.Time;
  };

  var nextId = 1;
  let orders = List.empty<Order>();

  public shared ({ caller }) func submitOrder(
    fullName : Text,
    instagramUsername : Text,
    packageName : Text,
    postLink : Text,
  ) : async () {
    let order : Order = {
      id = nextId;
      fullName;
      instagramUsername;
      packageName;
      postLink;
      timestamp = Time.now();
    };
    nextId += 1;
    orders.add(order);
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    orders.toArray();
  };
};
