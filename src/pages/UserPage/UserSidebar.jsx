import React from 'react'
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/material'
import { useLogin } from "../../hooks/LoginContext";

const UserSidebar = () => {

    const MIN_PRICE = 100;
    const MAX_PRICE = 10000;
    const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]);
    const [anyPrice, setAnyPrice] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const { logout } = useLogin();


    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleAnyPriceChange = (e) => {
        setAnyPrice(e.target.checked);
        if (e.target.checked) {
            setPriceRange([MIN_PRICE, MAX_PRICE]);
        }
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);

    };

    const handleLogOut = () => {
        logout();
    
    };
    

    return (
        
        <div className={`flex ${isOpen ? 'w-[30%]' : 'w-0'} transition-all duration-300`}>
            
                {/* Arrow Button */}
                <button
                    onClick={toggleSidebar}
                    className={`absolute  w-[1.5%] h-[1.5%] text-white transition-all`}
                >
                   <img src="/211688_forward_arrow_icon.webp" alt="" />
                </button>

                <aside
                className={`p-8 w-full bg-white border-r border-gray-300 shadow-lg overflow-hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300`}
            >
                <button
                    onClick={toggleSidebar}
                    className={`absolute top-2 right-2 w-[7.5%] h-[7.5%]  text-white transition-all`}
                >
                    <img src="/352467_arrow_left_icon.webp" alt="close-btn" />
                </button>




                <div className="flex items-center justify-center gap-4">
                    <img src="/Logo.webp" alt="logo" />
                    <div className=''>
                        <h1 className="text-lg font-bold ">Welcome, Aryans</h1>
                        <p className="text-sm text-gray-500">Mon, 30 Dec 2024</p>
                    </div>

                </div>
                <h2 className='font-bold m-4'>Filter</h2>
                <div>
                    <label className='block text-gray-500 font-medium mb-2'>City</label>
                    <select className='border border-gray-300 rounded p-2 w-[80%]'>
                        <option>Mumbai</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label className="block text-gray-500 font-medium mb-2">Property Type</label>
                    <div className="grid grid-cols-2 gap-3">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="propertyType" className="h-4 w-4 text-blue-500" />
                            <span>All Properties</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="h-4 w-4 text-blue-500" />
                            <span>Commercial</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="h-4 w-4 text-blue-500" />
                            <span>Retail/Showroom</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="h-4 w-4 text-blue-500" />
                            <span>Land/Plot</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="h-4 w-4 text-blue-500" />
                            <span>Industrial</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="h-4 w-4 text-blue-500" />
                            <span>Warehouse</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="h-4 w-4 text-blue-500" />
                            <span>IT/ITES Properties</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="h-4 w-4 text-blue-500" />
                            <span>Pre Leased Properties</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="h-4 w-4 text-blue-500" />
                            <span>Coworking Spaces</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="h-4 w-4 text-blue-500" />
                            <span>Residential</span>
                        </label>
                        <div className='mt-2'>
                            <label className='block text-gray-500 font-medium '>Price Range</label>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-sm p-1">

                    {/* MUI Slider Component */}
                    <Box sx={{ width: '80%', paddingBottom: '1rem' }}>
                        <Slider
                            value={priceRange}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `$${value.toLocaleString()}`}
                            min={MIN_PRICE}
                            max={MAX_PRICE}
                            step={100}
                            disabled={anyPrice}
                            sx={{
                                '& .MuiSlider-thumb': {
                                    width: 12,
                                    height: 12,
                                    backgroundColor: 'blue',
                                    borderRadius: '50%',
                                },
                                '& .MuiSlider-rail': {
                                    opacity: 0.2,
                                },
                                '& .MuiSlider-track': {
                                    backgroundColor: 'blue',
                                },
                            }}
                        />
                    </Box>

                    {/* Dynamic price labels under each handle */}
                    <div className="flex items-center justify-between text-sm text-gray-500 -mt-4">
                        <div>${priceRange[0].toLocaleString()}</div>
                        <div>${priceRange[1].toLocaleString()}</div>
                    </div>

                    {/* Any price checkbox */}

                </div>


                <label className="flex items-center gap-2 mt-2 ">
                    <input type="checkbox" name="propertyType" className="h-4 w-4 text-blue-500" />
                    <span>Any Price</span>
                </label>

                {/* size */}
                <div className="mt-4">
                    <label className="block text-gray-500 font-medium mb-2">Size</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            placeholder="Min"
                            className=" w-[40%] border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            className=" w-[40%] border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {/* Unit */}
                        <span className="flex items-center text-sm text-gray-500">sq ft</span>
                    </div>
                </div>
                <div className='mt-4 flex gap-10 p-24'>
                    <button className='text-red-600 '>Cancel</button>
                    <button className='bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-700'>Apply filters</button>
                </div>
                <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogOut}
                  className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 "
                >
                  Logout
                </button>
              </div>
            </aside>
        </div>


    )
}

export default UserSidebar



