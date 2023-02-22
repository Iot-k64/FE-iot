import instanceAxios from './base';

class TrackRecord {
  static async getTrackRecord(containerId) {
    const response = await instanceAxios.post(
      '/get-all-track-records',
      {
        containerId: containerId
      }
    );
    return response.data;
  }
}

export default TrackRecord;
