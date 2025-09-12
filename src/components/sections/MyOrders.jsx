import { useAuth } from "../../hooks/useAuth";
import { Package } from "lucide-react";



const MyOrders= () => {
 
  const {  isAuthenticated } = useAuth();
  
    if (!isAuthenticated) {
      return (
        <div className="text-center py-4">
          <p className="text-muted">
            Please login to view your Orders.
          </p>
        </div>
      );
    }


    return(
        <div className="card text-center p-5">
          <Package size={48} className="text-muted mb-3 mx-auto" />
          <h5 className="mb-2">No Orders Yet</h5>
          <p className="text-muted">
            You haven't placed any orders yet. Start shopping to see your order
            history here!
          </p>
        </div>
    );
}
export default MyOrders;