import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-2">Access denied</h2>
      <p className="text-sm text-gray-600">You don’t have permission to view this page.</p>
      {/* <p className="text-sm text-gray-600">Go Back to Homepage <span><Link to='/'><Home/></Link></span></p> */}
    </div>
  );
}
