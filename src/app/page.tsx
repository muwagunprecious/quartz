import HeroSlider from '@/components/home/HeroSlider';
import CategoryRail from '@/components/home/CategoryRail';
import FilterBar from '@/components/home/FilterBar';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import DeliveryRequestModal from '@/components/delivery/DeliveryRequestModal';
import ProductRecommendations from '@/components/product/ProductRecommendations';

export default function Home() {
  return (
    <main className="min-h-screen pb-12">
      <div className="container max-w-[1200px] mx-auto px-4 pt-6">
        <HeroSlider />
        <CategoryRail />
        <FilterBar />
        <FeaturedProducts />
        <ProductRecommendations />
      </div>
      <DeliveryRequestModal />
    </main>
  );
}
