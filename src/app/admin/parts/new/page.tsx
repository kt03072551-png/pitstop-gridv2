"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Package, CheckCircle2, AlertTriangle, Save } from "lucide-react";
import { useTranslation } from "@/lib/i18n/translations";

export default function AdminAddPartPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    oemPartNumber: "",
    sku: "",
    price: "",
    costPrice: "",
    stockQuantity: "10",
    warehouseBin: "",
    warehouseAisle: "",
    category: "Engine & Drivetrain",
    grade: "OEM_GENUINE",
    isUniversalFit: false,
    description: "",
    descriptionTh: "",
    image: "",
  });

  const [specs, setSpecs] = useState([{ keyEn: "", valEn: "", keyTh: "", valTh: "" }]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    const specifications: Record<string, string> = {};
    const specificationsTh: Record<string, string> = {};
    
    specs.forEach(s => {
      if (s.keyEn && s.valEn) specifications[s.keyEn] = s.valEn;
      if (s.keyTh && s.valTh) specificationsTh[s.keyTh] = s.valTh;
    });

    try {
      const res = await fetch("/api/parts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stockQuantity: Number(formData.stockQuantity),
          specifications,
          specificationsTh
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.adminAddPart.errorMsg);

      setSuccess(true);
      setTimeout(() => {
        router.push("/catalog"); // Navigate to catalog to see the new part
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F7] dark:bg-[#1B262C] py-10 px-4 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-[#DBE2EF] dark:border-[#0F4C75] pb-6">
          <Link href="/admin/dashboard" className="p-2 rounded-xl bg-[#DBE2EF]/60 dark:bg-[#0F4C75]/60 hover:bg-[#DBE2EF] dark:hover:bg-[#0F4C75] text-[#112D4E] dark:text-[#BBE1FA] transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] text-white dark:text-[#1B262C] flex items-center justify-center shadow-md">
              <Package className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-mono font-black text-[#112D4E] dark:text-[#BBE1FA] uppercase tracking-tight">
              {t.adminAddPart.pageTitle}
            </h1>
          </div>
        </div>

        {success && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <p className="font-mono font-bold text-sm">{t.adminAddPart.successMsg}</p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-600 dark:text-rose-400">
            <AlertTriangle className="w-5 h-5" />
            <p className="font-mono font-bold text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="rounded-2xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/30 dark:bg-[#0F4C75]/20 p-6 space-y-4">
            <h2 className="font-mono font-bold text-[#3F72AF] dark:text-[#3282B8] uppercase">{t.adminAddPart.sectionBasicInfo}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">{t.adminAddPart.fieldTitle}</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full min-h-[44px] px-4 py-2 rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-2 focus:ring-[#3F72AF] dark:focus:ring-[#3282B8] transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">{t.adminAddPart.fieldBrand}</label>
                <input required type="text" name="brand" value={formData.brand} onChange={handleChange} className="w-full min-h-[44px] px-4 py-2 rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-2 focus:ring-[#3F72AF] dark:focus:ring-[#3282B8] transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">{t.adminAddPart.fieldOem}</label>
                <input required type="text" name="oemPartNumber" value={formData.oemPartNumber} onChange={handleChange} className="w-full min-h-[44px] px-4 py-2 rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-2 focus:ring-[#3F72AF] dark:focus:ring-[#3282B8] transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">{t.adminAddPart.fieldSku}</label>
                <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="w-full min-h-[44px] px-4 py-2 rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-2 focus:ring-[#3F72AF] dark:focus:ring-[#3282B8] transition-all" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">{t.adminAddPart.fieldImage}</label>
                <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder={t.adminAddPart.fieldImagePlaceholder} className="w-full min-h-[44px] px-4 py-2 rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-2 focus:ring-[#3F72AF] dark:focus:ring-[#3282B8] transition-all" />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="rounded-2xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/30 dark:bg-[#0F4C75]/20 p-6 space-y-4">
            <h2 className="font-mono font-bold text-[#3F72AF] dark:text-[#3282B8] uppercase">{t.adminAddPart.sectionPricingStock}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">{t.adminAddPart.fieldPrice}</label>
                <input required type="number" min="0" name="price" value={formData.price} onChange={handleChange} className="w-full min-h-[44px] px-4 py-2 rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-2 focus:ring-[#3F72AF] dark:focus:ring-[#3282B8] transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">{t.adminAddPart.fieldCostPrice}</label>
                <input required type="number" min="0" name="costPrice" value={formData.costPrice} onChange={handleChange} className="w-full min-h-[44px] px-4 py-2 rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-2 focus:ring-[#3F72AF] dark:focus:ring-[#3282B8] transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">{t.adminAddPart.fieldStock}</label>
                <input required type="number" min="0" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} className="w-full min-h-[44px] px-4 py-2 rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-2 focus:ring-[#3F72AF] dark:focus:ring-[#3282B8] transition-all" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">{t.adminAddPart.fieldBin}</label>
                <input required type="text" name="warehouseBin" value={formData.warehouseBin} onChange={handleChange} placeholder="e.g. Bin A12" className="w-full min-h-[44px] px-4 py-2 rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-2 focus:ring-[#3F72AF] dark:focus:ring-[#3282B8] transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">{t.adminAddPart.fieldAisle}</label>
                <input required type="text" name="warehouseAisle" value={formData.warehouseAisle} onChange={handleChange} placeholder="e.g. Row 4" className="w-full min-h-[44px] px-4 py-2 rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-2 focus:ring-[#3F72AF] dark:focus:ring-[#3282B8] transition-all" />
              </div>
            </div>
          </div>

          {/* Categorization & Fitment */}
          <div className="rounded-2xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/30 dark:bg-[#0F4C75]/20 p-6 space-y-4">
            <h2 className="font-mono font-bold text-[#3F72AF] dark:text-[#3282B8] uppercase">{t.adminAddPart.sectionCategorization}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">{t.adminAddPart.fieldCategory}</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full min-h-[44px] px-4 py-2 rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-2 focus:ring-[#3F72AF] dark:focus:ring-[#3282B8] transition-all">
                  <option value="Engine & Drivetrain">Engine & Drivetrain</option>
                  <option value="Exhaust Systems">Exhaust Systems</option>
                  <option value="Braking & Suspension">Braking & Suspension</option>
                  <option value="Body & Aero">Body & Aero</option>
                  <option value="Electrical & Tuning">Electrical & Tuning</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">{t.adminAddPart.fieldGrade}</label>
                <select name="grade" value={formData.grade} onChange={handleChange} className="w-full min-h-[44px] px-4 py-2 rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-2 focus:ring-[#3F72AF] dark:focus:ring-[#3282B8] transition-all">
                  <option value="OEM_GENUINE">OEM Genuine</option>
                  <option value="AFTERMARKET">Aftermarket</option>
                  <option value="PERFORMANCE">Performance Spec</option>
                </select>
              </div>
            </div>
            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="isUniversalFit" checked={formData.isUniversalFit} onChange={handleChange} className="w-5 h-5 rounded border-[#DBE2EF] text-[#3F72AF] focus:ring-[#3F72AF]" />
                <span className="text-sm font-bold text-[#112D4E] dark:text-[#BBE1FA]">{t.adminAddPart.fieldUniversalFit}</span>
              </label>
            </div>
          </div>

          {/* Detailed Specifications */}
          <div className="rounded-2xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/30 dark:bg-[#0F4C75]/20 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-mono font-bold text-[#3F72AF] dark:text-[#3282B8] uppercase">{t.adminAddPart.sectionSpecifications}</h2>
              <button
                type="button"
                onClick={() => setSpecs([...specs, { keyEn: "", valEn: "", keyTh: "", valTh: "" }])}
                className="px-3 py-1.5 rounded-lg bg-[#3F72AF] text-white text-xs font-bold font-mono shadow-sm hover:opacity-90 transition-all"
              >
                {t.adminAddPart.addSpecBtn}
              </button>
            </div>
            
            <div className="space-y-4">
              {specs.map((spec, index) => (
                <div key={index} className="p-4 rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-white/50 dark:bg-[#1B262C]/50 space-y-4 relative">
                  {specs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setSpecs(specs.filter((_, i) => i !== index))}
                      className="absolute top-2 right-2 text-xs font-bold text-rose-500 hover:text-rose-600 px-2 py-1 bg-rose-50 dark:bg-rose-500/10 rounded transition-all"
                    >
                      {t.adminAddPart.removeSpecBtn}
                    </button>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-[#112D4E]/50 dark:text-[#85B5D9]/70 font-bold">{t.adminAddPart.specKeyEn}</label>
                      <input type="text" value={spec.keyEn} onChange={(e) => {
                        const newSpecs = [...specs];
                        newSpecs[index].keyEn = e.target.value;
                        setSpecs(newSpecs);
                      }} className="w-full px-3 py-2 text-sm rounded-lg border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-1 focus:ring-[#3F72AF] transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-[#112D4E]/50 dark:text-[#85B5D9]/70 font-bold">{t.adminAddPart.specValueEn}</label>
                      <input type="text" value={spec.valEn} onChange={(e) => {
                        const newSpecs = [...specs];
                        newSpecs[index].valEn = e.target.value;
                        setSpecs(newSpecs);
                      }} className="w-full px-3 py-2 text-sm rounded-lg border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-1 focus:ring-[#3F72AF] transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-[#112D4E]/50 dark:text-[#85B5D9]/70 font-bold">{t.adminAddPart.specKeyTh}</label>
                      <input type="text" value={spec.keyTh} onChange={(e) => {
                        const newSpecs = [...specs];
                        newSpecs[index].keyTh = e.target.value;
                        setSpecs(newSpecs);
                      }} className="w-full px-3 py-2 text-sm rounded-lg border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-1 focus:ring-[#3F72AF] transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase text-[#112D4E]/50 dark:text-[#85B5D9]/70 font-bold">{t.adminAddPart.specValueTh}</label>
                      <input type="text" value={spec.valTh} onChange={(e) => {
                        const newSpecs = [...specs];
                        newSpecs[index].valTh = e.target.value;
                        setSpecs(newSpecs);
                      }} className="w-full px-3 py-2 text-sm rounded-lg border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-1 focus:ring-[#3F72AF] transition-all" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-[#DBE2EF]/30 dark:bg-[#0F4C75]/20 p-6 space-y-4">
            <h2 className="font-mono font-bold text-[#3F72AF] dark:text-[#3282B8] uppercase">{t.adminAddPart.sectionDescription}</h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">{t.adminAddPart.fieldDescEn}</label>
                <textarea required rows={4} name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-2 focus:ring-[#3F72AF] dark:focus:ring-[#3282B8] transition-all resize-none"></textarea>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#112D4E]/70 dark:text-[#85B5D9] font-bold">{t.adminAddPart.fieldDescTh}</label>
                <textarea rows={4} name="descriptionTh" value={formData.descriptionTh} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#DBE2EF] dark:border-[#0F4C75] bg-white dark:bg-[#1B262C] text-[#112D4E] dark:text-[#BBE1FA] focus:ring-2 focus:ring-[#3F72AF] dark:focus:ring-[#3282B8] transition-all resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="min-h-[44px] px-8 py-3 rounded-xl bg-[#3F72AF] dark:bg-[#3282B8] hover:opacity-90 disabled:opacity-50 text-white dark:text-[#1B262C] font-mono font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              <span>{t.adminAddPart.submitBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
