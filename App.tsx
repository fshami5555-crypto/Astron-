import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { LocalizationProvider } from './context/LocalizationContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Checkout from './components/Reservations'; // Renamed to Checkout internally
import AdminPanel from './components/AdminPanel';
import MenuItemDetail from './components/MenuItemDetail';
import Cart from './components/Cart';
import Auth from './components/Auth';
import AdminLoginModal from './components/AdminLoginModal';
import FeaturedDishes from './components/FeaturedDishes';
import FeaturedDesserts from './components/FeaturedDesserts';
import TalabatNotification from './components/TalabatNotification';
import { loadState, saveState } from './services/storageService';
import type { Page, MenuItem, Order, GalleryImage, SiteContent, SocialLink, CartItem, User, Currency } from './types';

const App: React.FC = () => {
  const initialState = useMemo(() => loadState(), []);

  const [currentPage, setCurrentPage] = useState<Page>('home');
  
  // Persisted State
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialState.menuItems);
  const [orders, setOrders] = useState<Order[]>(initialState.orders);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialState.galleryImages);
  const [siteContent, setSiteContent] = useState<SiteContent>(initialState.siteContent);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialState.socialLinks);
  const [users, setUsers] = useState<User[]>(initialState.users);
  
  // Ephemeral State
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currency, setCurrency] = useState<Currency>('usd');
  const [isAdminLoginVisible, setIsAdminLoginVisible] = useState(false);
  const [isTalabatVisible, setIsTalabatVisible] = useState(false);

  // Effect to save state to localStorage whenever persisted data changes
  useEffect(() => {
    saveState({
      menuItems,
      orders,
      galleryImages,
      siteContent,
      socialLinks,
      users,
    });
  }, [menuItems, orders, galleryImages, siteContent, socialLinks, users]);

  useEffect(() => {
    const { enabled, frequencyMinutes } = siteContent.notificationSettings;
    if (!enabled) {
        setIsTalabatVisible(false);
        return;
    }

    if (frequencyMinutes === 0) {
        const dismissed = sessionStorage.getItem('notificationDismissed');
        if (!dismissed) {
            setIsTalabatVisible(true);
        }
    } else {
        const lastDismissed = localStorage.getItem('notificationLastDismissed');
        const now = new Date().getTime();
        const frequencyMs = frequencyMinutes * 60 * 1000;

        if (!lastDismissed || (now - Number(lastDismissed)) > frequencyMs) {
            setIsTalabatVisible(true);
        }
    }
  }, [siteContent.notificationSettings]);

  const handleSetPage = useCallback((page: Page) => {
    setSelectedMenuItem(null);
    setCurrentPage(page);
  }, []);

  const handleAddToCart = useCallback((itemToAdd: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemToAdd.id);
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.id === itemToAdd.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      }
      return [...prevCart, { ...itemToAdd, quantity: 1 }];
    });
    alert(`${itemToAdd.name.en} added to cart!`);
  }, []);

  const handleUpdateCartQuantity = useCallback((itemId: string, newQuantity: number) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== itemId);
      }
      return prevCart.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item);
    });
  }, []);

  const handleCheckout = useCallback(() => {
    if (currentUser) {
      setCurrentPage('checkout');
    } else {
      setCurrentPage('auth');
    }
  }, [currentUser]);

  const handleLogin = useCallback((phone: string, pass: string): boolean => {
    const user = users.find(u => u.phone === phone && u.password === pass);
    if (user) {
      setCurrentUser(user);
      setCurrentPage('checkout');
      return true;
    }
    alert('Invalid credentials.');
    return false;
  }, [users]);
  
  const handleSignup = useCallback((phone: string, pass: string): boolean => {
    if (users.some(u => u.phone === phone)) {
      alert('User with this phone number already exists.');
      return false;
    }
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser: User = {
      id: newId,
      phone,
      password: pass,
      loyaltyPoints: 0,
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setCurrentPage('checkout');
    return true;
  }, [users]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setCurrentPage('home');
  }, []);
  
  const handleAddOrder = useCallback((orderDetails: Omit<Order, 'id' | 'items' | 'totalPrice' | 'userId' | 'pointsAwarded'>) => {
    const totalValue = cart.reduce((total, item) => total + item.price[currency] * item.quantity, 0);
    const newOrder: Order = {
      ...orderDetails,
      id: Date.now().toString(),
      items: cart,
      totalPrice: {
        value: totalValue,
        currency: currency,
      },
      userId: currentUser?.phone,
      pointsAwarded: false,
    };
    setOrders(prev => [...prev, newOrder]);
    setCart([]); // Clear cart
    alert('Order placed successfully!');
    setCurrentPage('home');
  }, [cart, currentUser, currency]);

  const handleAwardPoints = useCallback((orderId: string) => {
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) return;

    const order = orders[orderIndex];
    if (order.pointsAwarded || order.totalPrice.currency !== 'jod' || !order.userId) return;

    const pointsToAdd = Math.floor(order.totalPrice.value);
    
    let updatedUserForSession: User | null = null;

    setUsers(prevUsers => {
        const userIndex = prevUsers.findIndex(u => u.phone === order.userId);
        if (userIndex === -1) return prevUsers;

        const updatedUsers = [...prevUsers];
        const targetUser = updatedUsers[userIndex];
        updatedUsers[userIndex] = {
            ...targetUser,
            loyaltyPoints: targetUser.loyaltyPoints + pointsToAdd,
        };
        
        if(currentUser && currentUser.phone === order.userId) {
          updatedUserForSession = updatedUsers[userIndex];
        }

        return updatedUsers;
    });

    setOrders(prevOrders => {
        const updatedOrders = [...prevOrders];
        updatedOrders[orderIndex] = { ...order, pointsAwarded: true };
        return updatedOrders;
    });

    if (updatedUserForSession) {
        setCurrentUser(updatedUserForSession);
    }
  }, [orders, users, currentUser]);

  const handleDismissTalabat = () => {
    setIsTalabatVisible(false);
    const { frequencyMinutes } = siteContent.notificationSettings;
    if (frequencyMinutes === 0) {
        sessionStorage.setItem('notificationDismissed', 'true');
    } else {
        localStorage.setItem('notificationLastDismissed', new Date().getTime().toString());
    }
  };

  const cartItemCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero setPage={handleSetPage} logoUrl={siteContent.logoUrl} heroImageUrl={siteContent.heroImage} />
            <FeaturedDishes 
              menuItems={menuItems} 
              setPage={handleSetPage} 
              featuredDishIds={siteContent.featuredDishIds}
            />
            <FeaturedDesserts
              menuItems={menuItems}
              setPage={handleSetPage}
              featuredDessertIds={siteContent.featuredDessertIds}
            />
          </>
        );
      case 'menu':
        return selectedMenuItem ? (
          <MenuItemDetail 
            item={selectedMenuItem} 
            onBack={() => setSelectedMenuItem(null)} 
            currency={currency}
          />
        ) : (
          <Menu 
            menuItems={menuItems} 
            onSelectItem={setSelectedMenuItem}
            onAddToCart={handleAddToCart}
            currency={currency}
            setCurrency={setCurrency}
          />
        );
      case 'about':
        return <About />;
      case 'gallery':
        return <Gallery images={galleryImages} />;
      case 'contact':
        return <Contact siteContent={siteContent} />;
      case 'checkout':
        return <Checkout addOrder={handleAddOrder} cart={cart} currency={currency} />;
      case 'cart':
        return <Cart cartItems={cart} onUpdateQuantity={handleUpdateCartQuantity} onCheckout={handleCheckout} currency={currency} />;
      case 'auth':
        return <Auth onLogin={handleLogin} onSignup={handleSignup} setPage={handleSetPage}/>;
      case 'admin':
        return (
          <AdminPanel
            menuItems={menuItems}
            orders={orders}
            galleryImages={galleryImages}
            siteContent={siteContent}
            socialLinks={socialLinks}
            users={users}
            onUpdateMenu={setMenuItems}
            onUpdateGallery={setGalleryImages}
            onUpdateSiteContent={setSiteContent}
            onUpdateSocialLinks={setSocialLinks}
            onAwardPoints={handleAwardPoints}
          />
        );
      default:
        return <Hero setPage={handleSetPage} logoUrl={siteContent.logoUrl} heroImageUrl={siteContent.heroImage} />;
    }
  };

  return (
    <LocalizationProvider>
      <div className="bg-[#0a0a0a] min-h-screen text-gray-200">
        <Header 
          currentPage={currentPage} 
          setPage={handleSetPage} 
          logoUrl={siteContent.logoUrl}
          cartItemCount={cartItemCount}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
        <main>{renderPage()}</main>
        <Footer 
          socialLinks={socialLinks}
          logoUrl={siteContent.logoUrl}
          onAdminClick={() => setIsAdminLoginVisible(true)}
        />
        {isAdminLoginVisible && (
          <AdminLoginModal 
            onClose={() => setIsAdminLoginVisible(false)}
            onSuccess={() => {
              setIsAdminLoginVisible(false);
              handleSetPage('admin');
            }}
          />
        )}
        {isTalabatVisible && (
          <TalabatNotification 
            settings={siteContent.notificationSettings}
            onDismiss={handleDismissTalabat} 
          />
        )}
      </div>
    </LocalizationProvider>
  );
};

export default App;