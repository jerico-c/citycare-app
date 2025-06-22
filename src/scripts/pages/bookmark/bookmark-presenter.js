import { reportMapper } from '../../data/api-mapper';

export default class BookmarkPresenter {
  #view;
  #model;
  #dbModel;
  #reportId;

  constructor({ view, model, dbModel, reportId }) {
    this.#view = view;
    this.#model = model;
    this.#dbModel = dbModel;
    this.#reportId = reportId;
  }

  async showReportsListMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error('showReportsListMap: error:', error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async initialGalleryAndMap() {
    this.#view.showReportsListLoading();

    try {
      await this.showReportsListMap();
      const listOfReports = await this.#model.getAllReports();
      const reports = await Promise.all(listOfReports.map(reportMapper));

      const message = 'Berhasil mendapatkan daftar laporan tersimpan.';
      this.#view.populateBookmarkedReports(message, reports);
    } catch (error) {
      console.error('initialGalleryAndMap: error:', error);
      this.#view.populateBookmarkedReportsError(error.message);
    } finally {
      this.#view.hideReportsListLoading();
    }
  }
}
