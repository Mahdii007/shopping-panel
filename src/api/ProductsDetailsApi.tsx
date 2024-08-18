export const fetchProduct = async (id: string) => {
    const res = await fetch(`http://localhost:5000/products/${id}`);
    return res.json();
  };


  