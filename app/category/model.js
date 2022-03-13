const mongoose = require('mongoose');

let categorySchema = mongoose.Schema(
  {
    name: { type: String, require: [true, 'Nama kategori tidak boleh kosong'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
