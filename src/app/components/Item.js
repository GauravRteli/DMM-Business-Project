import React from 'react';

const ItemTableRow = ({ item }) => {
  return (
    <tr className="hover:bg-gray-100 text-center transition duration-300 border-t border-gray-200">
      <td className="py-3 px-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2">
            {item.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{item.name}</p>
            <p className="text-xs text-gray-500">{item.brand}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">{item.type}</td>
      <td className="py-3 px-4">{item.StokePresent}</td>
      <td className="py-3 px-4">{item.StokeSold}</td>
      <td className="py-3 px-4">{item.StokeBuyed}</td>
      <td className="py-3 px-4">{item.unit}</td>
      <td className="py-3 px-4">{item.noofpiecesperpacket}</td>
    </tr>
  );
};

export default ItemTableRow;
