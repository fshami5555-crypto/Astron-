import React, { useState, useEffect } from 'react';
import type { MenuItem, Order, GalleryImage, SiteContent, SocialLink, User } from '../types';
import { MenuCategory } from '../types';
import { useLocalization } from '../hooks/useLocalization';

interface AdminPanelProps {
  menuItems: MenuItem[];
  orders: Order[];
  galleryImages: GalleryImage[];
  siteContent: SiteContent;
  socialLinks: SocialLink[];
  users: User[];
  onUpdateMenu: (items: MenuItem[]) => void;
  onUpdateGallery: (images: GalleryImage[]) => void;
  onUpdateSiteContent: (content: SiteContent) => void;
  onUpdateSocialLinks: (links: SocialLink[]) => void;
  onAwardPoints: (orderId: string) => void;
}

type AdminTab = 'menu' | 'orders' | 'content' | 'images' | 'loyalty' | 'signatureDishes' | 'notifications';

const AdminPanel: React.FC<AdminPanelProps> = ({
  menuItems,
  orders,
  galleryImages,
  siteContent,
  socialLinks,
  users,
  onUpdateMenu,
  onUpdateGallery,
  onUpdateSiteContent,
  onUpdateSocialLinks,
  onAwardPoints,
}) => {
  const { t } = useLocalization();
  const [activeTab, setActiveTab] = useState<AdminTab>('menu');

  // State for menu management
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState<Omit<MenuItem, 'id'>>({
      name: { en: '', ar: '' },
      description: { en: '', ar: '' },
      price: { usd: 0, jod: 0 },
      category: MenuCategory.Appetizers,
      image: '',
  });

   // State for gallery management
   const [newImage, setNewImage] = useState<Omit<GalleryImage, 'id'>>({
       src: '',
       alt: { en: '', ar: '' },
   });

   // State for loyalty management
   const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (editingItem) {
      setNewItem(editingItem);
    } else {
      resetNewItemForm();
    }
  }, [editingItem]);
  
  const resetNewItemForm = () => {
     setNewItem({
        name: { en: '', ar: '' },
        description: { en: '', ar: '' },
        price: { usd: 0, jod: 0 },
        category: MenuCategory.Appetizers,
        image: '',
      });
  }

  const handleMenuItemChange = <K extends keyof Omit<MenuItem, 'id'>>(field: K, value: Omit<MenuItem, 'id'>[K]) => {
      setNewItem(prev => ({...prev, [field]: value}));
  };

  const handlePriceChange = (currency: 'usd' | 'jod', value: number) => {
    setNewItem(prev => ({
        ...prev,
        price: { ...prev.price, [currency]: value }
    }));
  };

  const handleTranslatableFieldChange = (field: 'name' | 'description', lang: 'en' | 'ar', value: string) => {
    setNewItem(prev => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value }
    }));
  };

  const handleSaveMenuItem = () => {
    if (editingItem) {
      onUpdateMenu(menuItems.map(item => item.id === editingItem.id ? { ...newItem, id: editingItem.id } : item));
    } else {
      onUpdateMenu([...menuItems, { ...newItem, id: Date.now().toString() }]);
    }
    setEditingItem(null);
    resetNewItemForm();
  };
  
  const handleDeleteMenuItem = (id: string) => {
    if(window.confirm('Are you sure you want to delete this item?')) {
        onUpdateMenu(menuItems.filter(item => item.id !== id));
    }
  };

  const renderMenuManagement = () => (
    <div>
        <h3 className="text-2xl font-semibold mb-4 text-white">{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-900 p-4 rounded-lg mb-8">
            <input placeholder="Name (EN)" value={newItem.name.en} onChange={e => handleTranslatableFieldChange('name', 'en', e.target.value)} className="bg-gray-800 p-2 rounded text-white" />
            <input placeholder="Name (AR)" value={newItem.name.ar} onChange={e => handleTranslatableFieldChange('name', 'ar', e.target.value)} className="bg-gray-800 p-2 rounded text-white" dir="rtl"/>
            <textarea placeholder="Description (EN)" value={newItem.description.en} onChange={e => handleTranslatableFieldChange('description', 'en', e.target.value)} className="md:col-span-2 bg-gray-800 p-2 rounded text-white" />
            <textarea placeholder="Description (AR)" value={newItem.description.ar} onChange={e => handleTranslatableFieldChange('description', 'ar', e.target.value)} className="md:col-span-2 bg-gray-800 p-2 rounded text-white" dir="rtl"/>
            <input type="number" placeholder="Price (USD)" value={newItem.price.usd} onChange={e => handlePriceChange('usd', parseFloat(e.target.value) || 0)} className="bg-gray-800 p-2 rounded text-white" />
            <input type="number" placeholder="Price (JOD)" value={newItem.price.jod} onChange={e => handlePriceChange('jod', parseFloat(e.target.value) || 0)} className="bg-gray-800 p-2 rounded text-white" />
            <select value={newItem.category} onChange={e => handleMenuItemChange('category', e.target.value as MenuCategory)} className="md:col-span-2 bg-gray-800 p-2 rounded text-white">
                {Object.values(MenuCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <input placeholder="Image URL" value={newItem.image} onChange={e => handleMenuItemChange('image', e.target.value)} className="md:col-span-2 bg-gray-800 p-2 rounded text-white" />
            <div className="md:col-span-2 flex gap-4">
                <button onClick={handleSaveMenuItem} className="astren-bg-accent text-black px-4 py-2 rounded flex-grow">{editingItem ? 'Update Item' : 'Add Item'}</button>
                {editingItem && <button onClick={() => setEditingItem(null)} className="bg-gray-600 text-white px-4 py-2 rounded">Cancel Edit</button>}
            </div>
        </div>

        <h3 className="text-2xl font-semibold mb-4 text-white">Existing Menu Items</h3>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                    <tr>
                        <th className="px-6 py-3">Name (EN)</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Price (USD)</th>
                        <th className="px-6 py-3">Price (JOD)</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map(item => (
                        <tr key={item.id} className="bg-gray-800 border-b border-gray-700">
                            <td className="px-6 py-4">{item.name.en}</td>
                            <td className="px-6 py-4">{item.category}</td>
                            <td className="px-6 py-4">${item.price.usd.toFixed(2)}</td>
                            <td className="px-6 py-4">{item.price.jod.toFixed(2)} JOD</td>
                            <td className="px-6 py-4 flex gap-2">
                                <button onClick={() => setEditingItem(item)} className="font-medium text-blue-500 hover:underline">Edit</button>
                                <button onClick={() => handleDeleteMenuItem(item.id)} className="font-medium text-red-500 hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );

  const renderOrders = () => (
    <div>
        <h3 className="text-2xl font-semibold mb-4 text-white">Submitted Orders</h3>
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                    <tr>
                        <th className="px-6 py-3">Customer Name</th>
                        <th className="px-6 py-3">Contact</th>
                        <th className="px-6 py-3">Items</th>
                        <th className="px-6 py-3">Total</th>
                        <th className="px-6 py-3">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? orders.map(order => (
                        <tr key={order.id} className="bg-gray-800 border-b border-gray-700">
                            <td className="px-6 py-4">{order.name}</td>
                            <td className="px-6 py-4">{order.email}<br/>{order.phone}</td>
                            <td className="px-6 py-4">
                                <ul>
                                    {order.items.map(item => (
                                        <li key={item.id}>- {item.quantity}x {item.name.en}</li>
                                    ))}
                                </ul>
                            </td>
                            <td className="px-6 py-4 font-semibold astren-accent">
                                {order.totalPrice.currency === 'usd' ? '$' : ''}
                                {order.totalPrice.value.toFixed(2)}
                                {order.totalPrice.currency === 'jod' ? ' JOD' : ''}
                            </td>
                             <td className="px-6 py-4">{order.date} at {order.time}</td>
                        </tr>
                    )) : <tr><td colSpan={5} className="text-center py-8">No orders yet.</td></tr>}
                </tbody>
            </table>
        </div>
    </div>
  );
  
  const renderContentManagement = () => (
    <div className="space-y-8">
        <div>
            <h3 className="text-2xl font-semibold mb-4 text-white">{t('adminHeroImage')}</h3>
             <div className="bg-gray-900 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-300">Hero Image URL</label>
                <input placeholder="https://example.com/hero.jpg" value={siteContent.heroImage} onChange={e => onUpdateSiteContent({...siteContent, heroImage: e.target.value})} className="bg-gray-800 p-2 rounded w-full text-white" />
                 {siteContent.heroImage && <img src={siteContent.heroImage} alt="Hero Preview" className="mt-4 h-20 bg-gray-700 p-2 rounded object-cover w-full" />}
            </div>
        </div>
        <div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-900 p-4 rounded-lg">
                <input placeholder="Address (EN)" value={siteContent.address.en} onChange={e => onUpdateSiteContent({...siteContent, address: {...siteContent.address, en: e.target.value}})} className="bg-gray-800 p-2 rounded text-white" />
                <input placeholder="Address (AR)" value={siteContent.address.ar} onChange={e => onUpdateSiteContent({...siteContent, address: {...siteContent.address, ar: e.target.value}})} className="bg-gray-800 p-2 rounded text-white" dir="rtl"/>
                <input placeholder="Phone" value={siteContent.phone} onChange={e => onUpdateSiteContent({...siteContent, phone: e.target.value})} className="bg-gray-800 p-2 rounded text-white" />
                <input placeholder="Email" value={siteContent.email} onChange={e => onUpdateSiteContent({...siteContent, email: e.target.value})} className="bg-gray-800 p-2 rounded text-white" />
                <input placeholder="Map URL" value={siteContent.mapUrl} onChange={e => onUpdateSiteContent({...siteContent, mapUrl: e.target.value})} className="md:col-span-2 bg-gray-800 p-2 rounded text-white" />
            </div>
        </div>
         <div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Social Links</h3>
            <div className="space-y-2 bg-gray-900 p-4 rounded-lg">
                {socialLinks.map((link, index) => (
                    <div key={link.id} className="flex gap-2">
                        <input placeholder="Name (e.g., Instagram)" value={link.name} className="bg-gray-800 p-2 rounded w-1/3 text-white" readOnly/>
                        <input placeholder="URL" value={link.url} onChange={e => {
                            const newLinks = [...socialLinks];
                            newLinks[index].url = e.target.value;
                            onUpdateSocialLinks(newLinks);
                        }} className="bg-gray-800 p-2 rounded w-2/3 text-white" />
                    </div>
                ))}
            </div>
        </div>
    </div>
  );

  const renderImageManagement = () => (
    <div className="space-y-8">
        <div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Logo Management</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-300">Logo Image URL</label>
                <input placeholder="https://example.com/logo.png" value={siteContent.logoUrl} onChange={e => onUpdateSiteContent({...siteContent, logoUrl: e.target.value})} className="bg-gray-800 p-2 rounded w-full text-white" />
                 {siteContent.logoUrl && <img src={siteContent.logoUrl} alt="Logo Preview" className="mt-4 h-12 bg-gray-700 p-2 rounded" />}
            </div>
        </div>
        <div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Gallery Management</h3>
            <div className="space-y-4">
                {galleryImages.map((image) => (
                    <div key={image.id} className="bg-gray-900 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             <input value={image.src} onChange={e => {
                                const newImages = galleryImages.map(img => img.id === image.id ? {...img, src: e.target.value} : img);
                                onUpdateGallery(newImages);
                             }} placeholder="Image URL" className="md:col-span-3 bg-gray-800 p-2 rounded text-white" />
                             <input value={image.alt.en} onChange={e => {
                                const newImages = galleryImages.map(img => img.id === image.id ? {...img, alt: {...img.alt, en: e.target.value}} : img);
                                onUpdateGallery(newImages);
                             }} placeholder="Alt Text (EN)" className="bg-gray-800 p-2 rounded text-white" />
                             <input value={image.alt.ar} onChange={e => {
                                const newImages = galleryImages.map(img => img.id === image.id ? {...img, alt: {...img.alt, ar: e.target.value}} : img);
                                onUpdateGallery(newImages);
                             }} placeholder="Alt Text (AR)" className="bg-gray-800 p-2 rounded text-white" dir="rtl" />
                             <div className="flex items-center">
                                 <button onClick={() => {
                                     if (window.confirm('Are you sure you want to delete this image?')) {
                                        onUpdateGallery(galleryImages.filter(img => img.id !== image.id));
                                     }
                                 }} className="bg-red-600 text-white px-4 py-2 rounded h-full">Delete</button>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
             <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4 text-white">Add New Image</h4>
                 <div className="bg-gray-900 p-4 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input value={newImage.src} onChange={e => setNewImage({...newImage, src: e.target.value})} placeholder="Image URL" className="md:col-span-3 bg-gray-800 p-2 rounded text-white" />
                    <input value={newImage.alt.en} onChange={e => setNewImage({...newImage, alt: {...newImage.alt, en: e.target.value}})} placeholder="Alt Text (EN)" className="bg-gray-800 p-2 rounded text-white" />
                    <input value={newImage.alt.ar} onChange={e => setNewImage({...newImage, alt: {...newImage.alt, ar: e.target.value}})} placeholder="Alt Text (AR)" className="bg-gray-800 p-2 rounded text-white" dir="rtl" />
                    <button onClick={() => {
                        onUpdateGallery([...galleryImages, {...newImage, id: Date.now().toString()}]);
                        setNewImage({ src: '', alt: { en: '', ar: '' } });
                    }} className="astren-bg-accent text-black px-4 py-2 rounded">Add Image</button>
                </div>
            </div>
        </div>
    </div>
  );

    const renderLoyaltyManagement = () => {
        const selectedUserOrders = selectedUser ? orders.filter(o => o.userId === selectedUser.phone) : [];
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <h3 className="text-2xl font-semibold mb-4 text-white">Customers</h3>
                    <div className="space-y-2">
                        {users.map(user => (
                            <div key={user.id} onClick={() => setSelectedUser(user)}
                                className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedUser?.id === user.id ? 'bg-amber-800/50' : 'bg-gray-900 hover:bg-gray-800'}`}>
                                <p className="font-semibold text-white">{t('customer')} #{user.id}</p>
                                <p className="text-sm text-gray-400">{user.phone}</p>
                                <p className="text-sm astren-accent">{user.loyaltyPoints} {t('loyaltyPoints')}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-2">
                     <h3 className="text-2xl font-semibold mb-4 text-white">
                        {selectedUser ? `Order History for Customer #${selectedUser.id}` : 'Select a Customer'}
                     </h3>
                     {selectedUser ? (
                        <div className="space-y-4">
                            {selectedUserOrders.length > 0 ? selectedUserOrders.map(order => (
                                <div key={order.id} className="bg-gray-900 p-4 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-white">Order #{order.id.slice(-5)}</p>
                                            <p className="text-sm text-gray-400">{order.date} @ {order.time}</p>
                                            <p className="text-lg font-semibold astren-accent mt-2">
                                                {order.totalPrice.currency === 'usd' ? '$' : ''}
                                                {order.totalPrice.value.toFixed(2)}
                                                {order.totalPrice.currency === 'jod' ? ' JOD' : ''}
                                            </p>
                                        </div>
                                        <div>
                                            {order.totalPrice.currency === 'jod' ? (
                                                order.pointsAwarded ? (
                                                    <span className="text-sm text-green-400 font-semibold px-3 py-1 bg-green-900/50 rounded-full">{t('pointsAwarded')}</span>
                                                ) : (
                                                    <button onClick={() => onAwardPoints(order.id)} className="astren-bg-accent text-black text-sm px-4 py-2 rounded-md">
                                                        {t('approvePoints')} ({Math.floor(order.totalPrice.value)})
                                                    </button>
                                                )
                                            ) : (
                                                <span className="text-sm text-gray-500">USD Order</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )) : <p className="text-gray-500">No orders found for this customer.</p>}
                        </div>
                     ) : <p className="text-gray-500">Select a customer from the list to view their order history and award loyalty points.</p>}
                </div>
            </div>
        );
    };

    const renderSignatureDishesManagement = () => {
        const handleFeaturedDishChange = (index: number, dishId: string) => {
            const newIds = [...(siteContent.featuredDishIds || ['', '', ''])];
            newIds[index] = dishId;
            
            if (new Set(newIds.filter(id => id)).size !== newIds.filter(id => id).length) {
                alert("Please select three unique dishes.");
                return;
            }
            onUpdateSiteContent({ ...siteContent, featuredDishIds: newIds });
        };

        const handleFeaturedDessertChange = (index: number, dishId: string) => {
            const newIds = [...(siteContent.featuredDessertIds || ['', '', ''])];
            newIds[index] = dishId;
            
            if (new Set(newIds.filter(id => id)).size !== newIds.filter(id => id).length) {
                alert("Please select three unique desserts.");
                return;
            }
            onUpdateSiteContent({ ...siteContent, featuredDessertIds: newIds });
        };

        return (
            <div className="space-y-12">
                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-white">Manage Signature Dishes</h3>
                    <p className="text-gray-400 mb-6">Select the three main dishes you want to feature on the homepage.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-900 p-6 rounded-lg">
                        {[0, 1, 2].map(index => {
                            const selectedId = siteContent.featuredDishIds?.[index];
                            const selectedDish = menuItems.find(item => item.id === selectedId);
                            return (
                                <div key={index}>
                                    <label className="block mb-2 text-sm font-medium text-gray-300">Featured Dish #{index + 1}</label>
                                    <select
                                        value={selectedId || ''}
                                        onChange={e => handleFeaturedDishChange(index, e.target.value)}
                                        className="bg-gray-800 p-2 rounded text-white w-full"
                                    >
                                        <option value="" disabled>Select a dish</option>
                                        {menuItems.map(item => (
                                            <option key={item.id} value={item.id}>{item.name.en}</option>
                                        ))}
                                    </select>
                                    {selectedDish && (
                                        <div className="mt-4 bg-gray-800 p-2 rounded flex items-center gap-4">
                                            <img src={selectedDish.image} alt={selectedDish.name.en} className="w-16 h-16 object-cover rounded"/>
                                            <div>
                                                <p className="font-semibold text-white">{selectedDish.name.en}</p>
                                                <p className="text-sm text-gray-400">{selectedDish.category}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-white">Manage Featured Desserts</h3>
                    <p className="text-gray-400 mb-6">Select the three desserts you want to feature on the homepage.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-900 p-6 rounded-lg">
                        {[0, 1, 2].map(index => {
                            const selectedId = siteContent.featuredDessertIds?.[index];
                            const selectedDessert = menuItems.find(item => item.id === selectedId);
                            return (
                                <div key={index}>
                                    <label className="block mb-2 text-sm font-medium text-gray-300">Featured Dessert #{index + 1}</label>
                                    <select
                                        value={selectedId || ''}
                                        onChange={e => handleFeaturedDessertChange(index, e.target.value)}
                                        className="bg-gray-800 p-2 rounded text-white w-full"
                                    >
                                        <option value="" disabled>Select a dessert</option>
                                        {menuItems.filter(item => item.category === MenuCategory.Desserts).map(item => (
                                            <option key={item.id} value={item.id}>{item.name.en}</option>
                                        ))}
                                    </select>
                                    {selectedDessert && (
                                        <div className="mt-4 bg-gray-800 p-2 rounded flex items-center gap-4">
                                            <img src={selectedDessert.image} alt={selectedDessert.name.en} className="w-16 h-16 object-cover rounded"/>
                                            <div>
                                                <p className="font-semibold text-white">{selectedDessert.name.en}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const renderNotificationManagement = () => (
    <div>
        <h3 className="text-2xl font-semibold mb-4 text-white">Notification Banner Settings</h3>
        <div className="space-y-6 bg-gray-900 p-6 rounded-lg">
            
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="notif-enabled"
                    checked={siteContent.notificationSettings.enabled}
                    onChange={e => onUpdateSiteContent({ ...siteContent, notificationSettings: { ...siteContent.notificationSettings, enabled: e.target.checked } })}
                    className="h-4 w-4 rounded astren-border-accent text-amber-600 bg-gray-700 border-gray-600 focus:ring-amber-500"
                />
                <label htmlFor="notif-enabled" className="ml-3 text-white">Enable Notification Banner</label>
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Notification Text (EN)</label>
                <input
                    placeholder="e.g., We are now on Talabat!"
                    value={siteContent.notificationSettings.text.en}
                    onChange={e => onUpdateSiteContent({ ...siteContent, notificationSettings: { ...siteContent.notificationSettings, text: { ...siteContent.notificationSettings.text, en: e.target.value } } })}
                    className="bg-gray-800 p-2 rounded w-full text-white"
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Notification Text (AR)</label>
                <input
                    placeholder="e.g., نحن متواجدون الآن على طلبات!"
                    value={siteContent.notificationSettings.text.ar}
                    onChange={e => onUpdateSiteContent({ ...siteContent, notificationSettings: { ...siteContent.notificationSettings, text: { ...siteContent.notificationSettings.text, ar: e.target.value } } })}
                    className="bg-gray-800 p-2 rounded w-full text-white"
                    dir="rtl"
                />
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Image URL</label>
                <input
                    placeholder="https://example.com/logo.png"
                    value={siteContent.notificationSettings.imageUrl}
                    onChange={e => onUpdateSiteContent({ ...siteContent, notificationSettings: { ...siteContent.notificationSettings, imageUrl: e.target.value } })}
                    className="bg-gray-800 p-2 rounded w-full text-white"
                />
                {siteContent.notificationSettings.imageUrl && <img src={siteContent.notificationSettings.imageUrl} alt="Preview" className="mt-4 h-12 bg-gray-700 p-2 rounded object-contain" />}
            </div>

            <div className="flex items-center gap-4">
                <label htmlFor="notif-color" className="text-sm font-medium text-gray-300">Background Color</label>
                <input
                    type="color"
                    id="notif-color"
                    value={siteContent.notificationSettings.backgroundColor}
                    onChange={e => onUpdateSiteContent({ ...siteContent, notificationSettings: { ...siteContent.notificationSettings, backgroundColor: e.target.value } })}
                    className="p-1 h-10 w-10 block bg-gray-800 border-gray-600 cursor-pointer rounded-lg"
                />
                 <input
                    type="text"
                    value={siteContent.notificationSettings.backgroundColor}
                    onChange={e => onUpdateSiteContent({ ...siteContent, notificationSettings: { ...siteContent.notificationSettings, backgroundColor: e.target.value } })}
                    className="bg-gray-800 p-2 rounded text-white"
                />
            </div>

            <div>
                <label htmlFor="notif-freq" className="block mb-2 text-sm font-medium text-gray-300">Display Frequency (in minutes)</label>
                <input
                    type="number"
                    id="notif-freq"
                    min="0"
                    value={siteContent.notificationSettings.frequencyMinutes}
                    onChange={e => onUpdateSiteContent({ ...siteContent, notificationSettings: { ...siteContent.notificationSettings, frequencyMinutes: parseInt(e.target.value, 10) || 0 } })}
                    className="bg-gray-800 p-2 rounded w-full text-white"
                />
                <p className="text-xs text-gray-500 mt-1">Set to 0 to show the notification once per browser session. Set to a value greater than 0 to show it again after that many minutes have passed since it was last dismissed.</p>
            </div>
        </div>
    </div>
  );


  return (
    <div className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl text-center mb-4 font-semibold text-gray-100">{t('adminTitle')}</h2>
        <div className="flex justify-center border-b border-gray-700 mb-8 flex-wrap">
          <button onClick={() => setActiveTab('menu')} className={`px-6 py-3 ${activeTab === 'menu' ? 'astren-accent border-b-2 astren-border-accent' : 'text-gray-400'}`}>{t('menu')}</button>
          <button onClick={() => setActiveTab('orders')} className={`px-6 py-3 ${activeTab === 'orders' ? 'astren-accent border-b-2 astren-border-accent' : 'text-gray-400'}`}>{t('viewOrders')}</button>
          <button onClick={() => setActiveTab('loyalty')} className={`px-6 py-3 ${activeTab === 'loyalty' ? 'astren-accent border-b-2 astren-border-accent' : 'text-gray-400'}`}>{t('loyalty')}</button>
          <button onClick={() => setActiveTab('signatureDishes')} className={`px-6 py-3 ${activeTab === 'signatureDishes' ? 'astren-accent border-b-2 astren-border-accent' : 'text-gray-400'}`}>{t('signatureDishes')}</button>
          <button onClick={() => setActiveTab('notifications')} className={`px-6 py-3 ${activeTab === 'notifications' ? 'astren-accent border-b-2 astren-border-accent' : 'text-gray-400'}`}>{t('notifications')}</button>
          <button onClick={() => setActiveTab('images')} className={`px-6 py-3 ${activeTab === 'images' ? 'astren-accent border-b-2 astren-border-accent' : 'text-gray-400'}`}>{t('manageImages')}</button>
          <button onClick={() => setActiveTab('content')} className={`px-6 py-3 ${activeTab === 'content' ? 'astren-accent border-b-2 astren-border-accent' : 'text-gray-400'}`}>{t('manageContent')}</button>
        </div>
        
        <div>
            {activeTab === 'menu' && renderMenuManagement()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'loyalty' && renderLoyaltyManagement()}
            {activeTab === 'signatureDishes' && renderSignatureDishesManagement()}
            {activeTab === 'notifications' && renderNotificationManagement()}
            {activeTab === 'images' && renderImageManagement()}
            {activeTab === 'content' && renderContentManagement()}
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;