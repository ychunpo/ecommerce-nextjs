import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Alert, CircularProgress, Grid, Typography } from '@mui/material';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import client from '../utils/client';
import { urlForThumbnail } from '../utils/image';
import { Store } from '../utils/Store';
export default function Home() {
  const {
    state: { cart },
    dispatch
  } = useContext(Store);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    products: [],
    error: '',
    loading: true,
  });
  const { loading, error, products } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        setState({ products, loading: false });
      } catch (err) {
        setState({ loading: false, error: err.message });
      }
    };
    fetchData();
  }, []);

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar('Sorry. Product is out of stock', { variant: 'error' });
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        _key: product._id,
        name: product.name,
        countInStock: product.countInStock,
        slug: product.slug.current,
        price: product.price,
        image: urlForThumbnail(product.image),
        quantity,
      },
    });
    enqueueSnackbar(`${product.name} added to the cart`, {
      variant: 'success',
    });
    router.push('/cart');
  };

  return (
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid item md={4} key={product.slug + index}>
              <ProductItem
                product={product}
                addToCartHandler={addToCartHandler}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}
