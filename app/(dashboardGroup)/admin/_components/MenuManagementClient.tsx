/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
    UtensilsCrossed,
    Plus,
    Pencil,
    Trash2,
    Sparkles,
    Tag,
    Search,
    CheckCircle2,
    AlertCircle,
    Loader2,
    X,
    ImageIcon,
    RefreshCw,
} from 'lucide-react';
import { createCategoryAction, createMenuItemAction, deleteCategoryAction, deleteMenuItemAction, ICategory, IMenuItem, toggleAdminMenuFlagAction, updateCategoryAction, updateMenuItemAction } from '../_actions/menuManagementActions';
// Adjust import path if needed

interface MenuManagementClientProps {
    initialCategories: ICategory[];
    initialMenuItems: IMenuItem[];
}

export const MenuManagementClient = ({
    initialCategories,
    initialMenuItems,
}: MenuManagementClientProps) => {
    const router = useRouter();
    const [isRefreshing, startTransition] = useTransition();

    const [categories, setCategories] = useState<ICategory[]>(initialCategories);
    const [menuItems, setMenuItems] = useState<IMenuItem[]>(initialMenuItems);

    // Filters
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    // Category Form State
    const [editingCategory, setEditingCategory] = useState<ICategory | null>(null);
    const [catName, setCatName] = useState('');
    const [catDesc, setCatDesc] = useState('');
    const [isSavingCat, setIsSavingCat] = useState(false);

    // Menu Item Modal State
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<IMenuItem | null>(null);
    const [itemName, setItemName] = useState('');
    const [itemDesc, setItemDesc] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemImageUrl, setItemImageUrl] = useState('');
    const [itemCategoryId, setItemCategoryId] = useState(initialCategories[0]?.id || '');
    const [itemAvailable, setItemAvailable] = useState(true);
    const [itemSpecial, setItemSpecial] = useState(false);
    const [isSavingItem, setIsSavingItem] = useState(false);

    // Busy IDs & Feedback
    const [busyId, setBusyId] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    React.useEffect(() => {
        setCategories(initialCategories);
    }, [initialCategories]);

    React.useEffect(() => {
        setMenuItems(initialMenuItems);
    }, [initialMenuItems]);

    // ==================== CATEGORY HANDLERS ====================

    const startEditCategory = (cat: ICategory) => {
        setEditingCategory(cat);
        setCatName(cat.name);
        setCatDesc(cat.description || '');
    };

    const resetCategoryForm = () => {
        setEditingCategory(null);
        setCatName('');
        setCatDesc('');
    };

    const handleCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!catName.trim()) return;

        setFeedback(null);
        setIsSavingCat(true);

        if (editingCategory) {
            const res = await updateCategoryAction(editingCategory.id, {
                name: catName.trim(),
                description: catDesc.trim() || undefined,
            });

            setIsSavingCat(false);
            if (!res.success) {
                setFeedback({ type: 'error', text: res.message });
                return;
            }

            setFeedback({ type: 'success', text: res.message });
            resetCategoryForm();
            startTransition(() => router.refresh());
        } else {
            const res = await createCategoryAction({
                name: catName.trim(),
                description: catDesc.trim() || undefined,
            });

            setIsSavingCat(false);
            if (!res.success) {
                setFeedback({ type: 'error', text: res.message });
                return;
            }

            setFeedback({ type: 'success', text: res.message });
            resetCategoryForm();
            startTransition(() => router.refresh());
        }
    };

    const handleDeleteCategory = async (categoryId: string) => {
        setFeedback(null);
        setBusyId(categoryId);

        const res = await deleteCategoryAction(categoryId);
        setBusyId(null);

        if (!res.success) {
            setFeedback({ type: 'error', text: res.message });
            return;
        }

        if (selectedCategoryId === categoryId) {
            setSelectedCategoryId('ALL');
        }
        setFeedback({ type: 'success', text: res.message });
        startTransition(() => router.refresh());
    };

    // ==================== MENU ITEM HANDLERS ====================

    const openCreateItemModal = () => {
        setEditingItem(null);
        setItemName('');
        setItemDesc('');
        setItemPrice('');
        setItemImageUrl('');
        setItemCategoryId(
            selectedCategoryId !== 'ALL'
                ? selectedCategoryId
                : categories[0]?.id || ''
        );
        setItemAvailable(true);
        setItemSpecial(false);
        setIsItemModalOpen(true);
    };

    const openEditItemModal = (item: IMenuItem) => {
        setEditingItem(item);
        setItemName(item.name);
        setItemDesc(item.description || '');
        setItemPrice(String(item.price));
        setItemImageUrl(item.imageUrl || '');
        setItemCategoryId(item.categoryId || item.category?.id || categories[0]?.id || '');
        setItemAvailable(item.isAvailable);
        setItemSpecial(item.isSpecial);
        setIsItemModalOpen(true);
    };

    const handleMenuItemSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const parsedPrice = Number(itemPrice);

        if (!itemName.trim() || !itemCategoryId || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
            setFeedback({
                type: 'error',
                text: 'Please provide a valid dish name, category, and positive price in BDT.',
            });
            return;
        }

        setFeedback(null);
        setIsSavingItem(true);

        const payload = {
            name: itemName.trim(),
            description: itemDesc.trim() || undefined,
            price: parsedPrice,
            imageUrl: itemImageUrl.trim() || undefined,
            categoryId: itemCategoryId,
            isAvailable: itemAvailable,
            isSpecial: itemSpecial,
        };

        const res = editingItem
            ? await updateMenuItemAction(editingItem.id, payload)
            : await createMenuItemAction(payload);

        setIsSavingItem(false);

        if (!res.success) {
            setFeedback({ type: 'error', text: res.message });
            return;
        }

        setIsItemModalOpen(false);
        setFeedback({ type: 'success', text: res.message });
        startTransition(() => router.refresh());
    };

    const handleDeleteMenuItem = async (menuItemId: string) => {
        setFeedback(null);
        setBusyId(menuItemId);

        const res = await deleteMenuItemAction(menuItemId);
        setBusyId(null);

        if (!res.success) {
            setFeedback({ type: 'error', text: res.message });
            return;
        }

        setFeedback({ type: 'success', text: res.message });
        startTransition(() => router.refresh());
    };

    const handleToggleFlag = async (
        item: IMenuItem,
        flagType: 'availability' | 'special'
    ) => {
        setFeedback(null);
        setBusyId(item.id);

        const nextAvailable = !item.isAvailable;
        setMenuItems((prev) =>
            prev.map((m) =>
                m.id === item.id
                    ? flagType === 'availability'
                        ? { ...m, isAvailable: nextAvailable }
                        : { ...m, isSpecial: !m.isSpecial }
                    : m
            )
        );

        const res = await toggleAdminMenuFlagAction(
            item.id,
            flagType,
            flagType === 'availability' ? nextAvailable : undefined
        );

        setBusyId(null);
        if (!res.success) {
            setFeedback({ type: 'error', text: res.message });
        }
        startTransition(() => router.refresh());
    };

    const filteredMenuItems = menuItems.filter((item) => {
        const itemCatId = item.categoryId || item.category?.id;
        const matchesCat =
            selectedCategoryId === 'ALL' || itemCatId === selectedCategoryId;
        const matchesSearch = item.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        return matchesCat && matchesSearch;
    });

    return (
        <main className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Top Header Banner */}
                <div className="bg-neutral-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-neutral-800 shadow-sm">
                    <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                <UtensilsCrossed className="w-3.5 h-3.5" /> Catalog & Pricing Control
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                Menu & Category Management
                            </h1>
                            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-xl">
                                Create food categories, add new campus dishes with BDT pricing, update photos, and toggle live stock or chef specials.
                            </p>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                            <button
                                type="button"
                                onClick={() => startTransition(() => router.refresh())}
                                disabled={isRefreshing}
                                className="inline-flex items-center gap-1.5 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 font-semibold text-xs rounded-xl transition-all cursor-pointer"
                            >
                                <RefreshCw
                                    className={`w-3.5 h-3.5 text-amber-400 ${isRefreshing ? 'animate-spin' : ''}`}
                                />
                                <span>Sync</span>
                            </button>

                            <button
                                type="button"
                                onClick={openCreateItemModal}
                                disabled={categories.length === 0}
                                className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:cursor-not-allowed"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add New Dish</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Feedback Alert Banner */}
                {feedback && (
                    <div
                        className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-2.5 ${feedback.type === 'success'
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                : 'bg-red-50 border-red-200 text-red-700'
                            }`}
                    >
                        {feedback.type === 'success' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        )}
                        <span>{feedback.text}</span>
                    </div>
                )}

                {/* Main 2-Column Layout: Categories (4 cols) + Menu Items (8 cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* Left Column (4 cols): Category Manager */}
                    <section className="lg:col-span-4 space-y-4">
                        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                                <h2 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-amber-600" />
                                    {editingCategory ? 'Edit Category' : 'Add Category'}
                                </h2>
                                {editingCategory && (
                                    <button
                                        type="button"
                                        onClick={resetCategoryForm}
                                        className="text-[11px] font-semibold text-neutral-400 hover:text-neutral-700 cursor-pointer"
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleCategorySubmit} className="space-y-3">
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                                        Category Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={catName}
                                        onChange={(e) => setCatName(e.target.value)}
                                        placeholder="e.g. Burgers, Drinks, Student Combos"
                                        className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:bg-white focus:outline-none focus:border-amber-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                                        Short Description (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={catDesc}
                                        onChange={(e) => setCatDesc(e.target.value)}
                                        placeholder="e.g. Flame-grilled beef & crispy chicken"
                                        className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:bg-white focus:outline-none focus:border-amber-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSavingCat}
                                    className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 disabled:opacity-60 text-amber-400 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    {isSavingCat ? (
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    ) : (
                                        <Plus className="w-3.5 h-3.5" />
                                    )}
                                    <span>{editingCategory ? 'Update Category' : 'Save Category'}</span>
                                </button>
                            </form>
                        </div>

                        {/* Existing Categories List */}
                        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                    Categories ({categories.length})
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setSelectedCategoryId('ALL')}
                                    className={`text-[11px] font-semibold cursor-pointer ${selectedCategoryId === 'ALL'
                                            ? 'text-amber-600 underline'
                                            : 'text-neutral-400 hover:text-neutral-700'
                                        }`}
                                >
                                    Show All ({menuItems.length})
                                </button>
                            </div>

                            {categories.length === 0 ? (
                                <div className="p-6 text-center text-xs text-neutral-500">
                                    No categories yet. Create your first category above before adding dishes!
                                </div>
                            ) : (
                                <div className="divide-y divide-neutral-100">
                                    {categories.map((cat) => {
                                        const isSelected = selectedCategoryId === cat.id;
                                        const itemCount = menuItems.filter(
                                            (m) => (m.categoryId || m.category?.id) === cat.id
                                        ).length;

                                        return (
                                            <div
                                                key={cat.id}
                                                className={`p-3.5 flex items-center justify-between gap-2 transition-colors ${isSelected ? 'bg-amber-50/70' : 'hover:bg-neutral-50'
                                                    }`}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedCategoryId(cat.id)}
                                                    className="text-left flex-1 cursor-pointer"
                                                >
                                                    <p
                                                        className={`text-xs font-bold ${isSelected ? 'text-amber-700' : 'text-neutral-900'
                                                            }`}
                                                    >
                                                        {cat.name}{' '}
                                                        <span className="text-[11px] font-normal text-neutral-400">
                                                            ({itemCount})
                                                        </span>
                                                    </p>
                                                    {cat.description && (
                                                        <p className="text-[11px] text-neutral-500 truncate max-w-[180px]">
                                                            {cat.description}
                                                        </p>
                                                    )}
                                                </button>

                                                <div className="flex items-center gap-1 shrink-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => startEditCategory(cat)}
                                                        className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
                                                        title="Edit category"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={busyId === cat.id}
                                                        onClick={() => handleDeleteCategory(cat.id)}
                                                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                                                        title="Delete category"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Right Column (8 cols): Menu Items List */}
                    <section className="lg:col-span-8 space-y-4">
                        {/* Search & Count Strip */}
                        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                                    <Search className="w-4 h-4" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search menu dishes by name..."
                                    className="w-full pl-10 pr-4 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <span className="text-xs font-semibold text-neutral-500 px-2">
                                Showing {filteredMenuItems.length} of {menuItems.length} dishes
                            </span>
                        </div>

                        {/* Menu Items Grid */}
                        {filteredMenuItems.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-12 text-center space-y-3">
                                <p className="text-sm font-bold text-neutral-900">No dishes found</p>
                                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                                    {categories.length === 0
                                        ? 'Create a category on the left first, then add your TR Cafe menu items.'
                                        : 'Click "Add New Dish" above to add food items to this category.'}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredMenuItems.map((item) => {
                                    const categoryLabel =
                                        item.category?.name ||
                                        categories.find((c) => c.id === item.categoryId)?.name ||
                                        'Uncategorized';
                                    const isBusy = busyId === item.id;

                                    return (
                                        <div
                                            key={item.id}
                                            className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 flex flex-col justify-between gap-4"
                                        >
                                            <div className="flex items-start gap-3.5">
                                                {item.imageUrl ? (
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        className="h-16 w-16 rounded-xl object-cover border border-neutral-200/80 shrink-0"
                                                    />
                                                ) : (
                                                    <div className="h-16 w-16 rounded-xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center shrink-0">
                                                        <ImageIcon className="w-5 h-5 text-neutral-400" />
                                                    </div>
                                                )}

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                                                            {categoryLabel}
                                                        </span>
                                                        {item.isSpecial && (
                                                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold">
                                                                <Sparkles className="w-2.5 h-2.5" /> Special
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="text-sm font-bold text-neutral-900 truncate mt-0.5">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-xs font-extrabold text-neutral-800 mt-1">
                                                        {item.price} BDT
                                                    </p>
                                                </div>
                                            </div>

                                            {item.description && (
                                                <p className="text-xs text-neutral-500 line-clamp-2">
                                                    {item.description}
                                                </p>
                                            )}

                                            {/* Controls Row */}
                                            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2 text-xs">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        disabled={isBusy}
                                                        onClick={() => handleToggleFlag(item, 'availability')}
                                                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${item.isAvailable
                                                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                                                : 'bg-red-50 border-red-200 text-red-600'
                                                            }`}
                                                    >
                                                        {item.isAvailable ? 'In Stock' : 'Sold Out'}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        disabled={isBusy}
                                                        onClick={() => handleToggleFlag(item, 'special')}
                                                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${item.isSpecial
                                                                ? 'bg-amber-50 border-amber-200 text-amber-700'
                                                                : 'bg-neutral-50 border-neutral-200 text-neutral-500'
                                                            }`}
                                                    >
                                                        {item.isSpecial ? '★ Special' : '☆ Regular'}
                                                    </button>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditItemModal(item)}
                                                        className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                                                        title="Edit dish"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={isBusy}
                                                        onClick={() => handleDeleteMenuItem(item.id)}
                                                        className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                                                        title="Delete dish"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                </div>
            </div>

            {/* Create / Edit Menu Item Modal */}
            {isItemModalOpen && (
                <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-2xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl border border-neutral-200 shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="p-5 sm:p-6 border-b border-neutral-100 flex items-center justify-between">
                            <h2 className="text-base font-extrabold text-neutral-900">
                                {editingItem ? 'Edit Menu Dish' : 'Add New Menu Dish'}
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsItemModalOpen(false)}
                                className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleMenuItemSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
                                    Dish Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                    placeholder="e.g. TR Monster Beef Burger"
                                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:bg-white focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
                                        Category *
                                    </label>
                                    <select
                                        required
                                        value={itemCategoryId}
                                        onChange={(e) => setItemCategoryId(e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 font-medium focus:bg-white focus:outline-none focus:border-amber-500"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
                                        Price (BDT) *
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        step="1"
                                        required
                                        value={itemPrice}
                                        onChange={(e) => setItemPrice(e.target.value)}
                                        placeholder="260"
                                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:bg-white focus:outline-none focus:border-amber-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
                                    Image URL (Optional)
                                </label>
                                <input
                                    type="url"
                                    value={itemImageUrl}
                                    onChange={(e) => setItemImageUrl(e.target.value)}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:bg-white focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
                                    Description (Optional)
                                </label>
                                <textarea
                                    rows={2}
                                    value={itemDesc}
                                    onChange={(e) => setItemDesc(e.target.value)}
                                    placeholder="Double beef patty, melted cheddar, smoky house sauce..."
                                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:bg-white focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div className="flex items-center gap-6 pt-1">
                                <label className="inline-flex items-center gap-2 font-semibold text-neutral-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={itemAvailable}
                                        onChange={(e) => setItemAvailable(e.target.checked)}
                                        className="rounded border-neutral-300 text-amber-500 focus:ring-amber-500"
                                    />
                                    <span>In Stock (Available)</span>
                                </label>

                                <label className="inline-flex items-center gap-2 font-semibold text-neutral-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={itemSpecial}
                                        onChange={(e) => setItemSpecial(e.target.checked)}
                                        className="rounded border-neutral-300 text-amber-500 focus:ring-amber-500"
                                    />
                                    <span>Mark as Chef Special</span>
                                </label>
                            </div>

                            <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setIsItemModalOpen(false)}
                                    className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 font-semibold cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSavingItem}
                                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold shadow-sm flex items-center gap-1.5 cursor-pointer"
                                >
                                    {isSavingItem && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                    <span>{editingItem ? 'Save Changes' : 'Create Dish'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};