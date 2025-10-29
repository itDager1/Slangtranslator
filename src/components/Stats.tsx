export function Stats() {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-16 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-8">
          <div className="text-[#E19E2F] mb-2">108+</div>
          <p className="text-gray-600">Слов в словаре</p>
        </div>
        
        <div className="text-center p-8">
          <div className="text-[#E19E2F] mb-2">7</div>
          <p className="text-gray-600">Категорий</p>
        </div>
        
        <div className="text-center p-8">
          <div className="text-[#E19E2F] mb-2">100%</div>
          <p className="text-gray-600">На русском языке</p>
        </div>
      </div>
    </div>
  );
}
