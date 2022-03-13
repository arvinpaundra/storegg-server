const Payment = require('./model');
const Bank = require('../bank/model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const payment = await Payment.find().populate('banks');

      res.render('admin/payment/view_payment', {
        alert,
        payment,
        name: req.session.user.name,
        title: 'Halaman Metode Pembayaran',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find();
      res.render('admin/payment/create', {
        banks,
        name: req.session.user.name,
        title: 'Halaman Tambah Metode Pembayaran',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { type, banks } = req.body;

      const payment = await Payment({ type, banks });
      await payment.save();

      req.flash('alertMessage', 'Berhasil tambah jenis pembayaran');
      req.flash('alertStatus', 'success');

      res.redirect('/payment');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const payment = await Payment.findById({ _id: id }).populate('banks');
      const banks = await Bank.find();

      res.render('admin/payment/edit', {
        payment,
        banks,
        name: req.session.user.name,
        title: 'Halaman Ubah Metode Pembayaran',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, banks } = req.body;

      req.flash('alertMessage', 'Berhasil ubah jenis pembayaran');
      req.flash('alertStatus', 'success');

      await Payment.findByIdAndUpdate({ _id: id }, { type, banks });

      res.redirect('/payment');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      req.flash('alertMessage', 'Berhasil hapus jenis pembayaran');
      req.flash('alertStatus', 'success');

      await Payment.findByIdAndRemove({ _id: id });

      res.redirect('/payment');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;

      req.flash('alertMessage', 'Berhasil ubah status jenis pembayaran');
      req.flash('alertStatus', 'success');

      const payment = await Payment.findOne({ _id: id });
      const status = payment.status === 'Y' ? 'N' : 'Y';

      await Payment.findByIdAndUpdate({ _id: id }, { status });

      res.redirect('/payment');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
};
