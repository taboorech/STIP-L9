import React, { useState, useRef } from 'react';

const parseXML = (xml: Document) => {
  const dishes = Array.from(xml.getElementsByTagName('dish'));

  return dishes.map((dish) => ({
    type: dish.getElementsByTagName('type')[0].textContent,
    name: dish.getElementsByTagName('name')[0].textContent,
    measure: dish.getElementsByTagName('measure')[0].textContent,
    ingredients: Array.from(dish.getElementsByTagName('ingredient')).map((ingredient) => ({
      name: ingredient.getElementsByTagName('name')[0].textContent,
      amount: ingredient.getElementsByTagName('amount')[0].textContent,
    })),
    recipe: dish.getElementsByTagName('recipe')[0].textContent,
    calories: dish.getElementsByTagName('calories')[0].textContent,
  }));
};

const Table = () => {
  const [dishes, setDishes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result as string;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'application/xml');
        const parsedDishes = parseXML(xmlDoc);
        setDishes(parsedDishes);
      };

      reader.onerror = () => {
        setError('Не вдалося прочитати файл');
      };

      reader.readAsText(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const loadDefaultFile = () => {
    fetch('/src/assets/document.xml')
      .then((response) => response.text())
      .then((text) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'application/xml');
        const parsedDishes = parseXML(xmlDoc);
        setDishes(parsedDishes);
      })
      .catch(() => {
        setError('Не вдалося завантажити файл за замовчуванням');
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Список страв</h1>

      <div className="mb-4 space-x-4">
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-colors"
        >
          Завантажити XML файл
        </button>
        <input
          type="file"
          accept=".xml"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        <button
          onClick={loadDefaultFile}
          className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition-colors"
        >
          Завантажити файл за замовчуванням
        </button>
      </div>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Тип</th>
              <th className="border px-4 py-2">Назва</th>
              <th className="border px-4 py-2">Одиниці виміру</th>
              <th className="border px-4 py-2">Інгредієнти</th>
              <th className="border px-4 py-2">Рецепт</th>
              <th className="border px-4 py-2">Калорії</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish, index) => (
              <tr key={index} className="border-t">
                <td className="border px-4 py-2 text-center">{dish.type}</td>
                <td className="border px-4 py-2 text-center">{dish.name}</td>
                <td className="border px-4 py-2 text-center">{dish.measure}</td>
                <td className="border px-4 py-2">
                  <ul className="list-disc space-y-1">
                    {dish.ingredients.map((ingredient: any, idx: number) => (
                      <li key={idx} className="flex justify-between gap-5">
                        <span>{ingredient.name}</span>
                        <span className="font-semibold">{ingredient.amount}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border px-4 py-2 text-justify">{dish.recipe}</td>
                <td className="border px-4 py-2 text-center">{dish.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;