const Basic = (props) => {
   return(
    <>
    <h1>{`http://localhost:5000/api/products/${props.data}`}</h1>
    </>
   )
}
export default Basic;