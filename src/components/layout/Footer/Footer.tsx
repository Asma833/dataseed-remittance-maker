import logo from "../../../assets/images/nium-logo.png"; 

const Footer = () => {
  return (
    <footer className="py-6">
      <div className="container mx-auto text-center">
      <a  className="hover:text-gray-300 text-sm">Powered By</a>  
      <img src={logo} className="h-12 w-100 m-auto"/>
        {/* <p>&copy; 2024 All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="" className="hover:text-gray-300">Privacy Policy</a>  
        </div> */}
      </div>
    </footer>
  )
}

export default Footer