import instanceAxios from './base';

class trackRecord {
  static async getTrackRecord(containerId) {
    const response = await instanceAxios.get(
      '/get-all-track-records',
      {
        id: containerId
      }
    );
    return response.data;
  }
}

export default trackRecord;
