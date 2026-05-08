import FAQ from '../models/FAQ.js';

export const getFAQs = async (req, res) => {
  const faqs = await FAQ.find();
  res.json(faqs);
};
export const createFAQ = async (req, res) => {
  const faq = await FAQ.create(req.body);
  res.status(201).json(faq);
};
export const updateFAQ = async (req, res) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(faq);
};
export const deleteFAQ = async (req, res) => {
  await FAQ.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};