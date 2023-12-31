import { client, urlFor } from "@/sanity-headphone/sanity.client";
import { Product, ProductDetails } from "@/components/index";

export async function getHeadphones() {
  return client.fetch(`*[ _type == 'product']{
    'image': image[].asset->url,
    name,
    'slug': slug.current, 
    price,
    details,
  }`);
}

export async function generateStaticParams(slug) {
  const data = await client.fetch(
    `*[ _type == 'product' && slug.current == '${slug}']`
  );

  return data.map((item) => ({
    slug: item.slug.current,
    name: item.name,
    image: item.image,
    details: item.details,
    price: item.price,
    _id: item._id,
  }));
}

const Page = async ({ params: { slug } }) => {
  const productData = await getHeadphones();
  const productSlug = await generateStaticParams(slug);
  const [{ name, image, details, price, _id }] = productSlug;
  // console.log(productSlug);
  // console.log(price);

  return (
    <div>
      <ProductDetails
        id={_id}
        name={name}
        image={image}
        details={details}
        price={price}
      />

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {productData?.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
