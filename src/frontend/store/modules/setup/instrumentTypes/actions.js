import Api from "@/scripts/Api";
import { handleCatchError, handleSuccessResponse } from "@/scripts/util";

export default {
    async loadInstrumentTypes({ commit }) {
        handleSuccessResponse();
        await Api()
            .get(`instrument-types`)
            .then((response) => {
                if (response.status === 200) {
                    commit("setInstrumentTypes", response.data);
                    handleSuccessResponse();
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },
    async loadInstrumentType({ commit }, { instrumentTypeId }) {
        handleSuccessResponse();
        await Api()
            .get(`instrument-types/${instrumentTypeId}`)
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse();
                    commit("setInstrumentType", response.data);
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },
    async registerInstrumentType({ commit }, instrumentTypeData) {
        handleSuccessResponse();
        await Api()
            .post(
                `instrument-types/register-instrument-type`,
                instrumentTypeData
            )
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse(
                        response.status,
                        "Instrument Type Registered Successfully!",
                        "bg-success",
                        true
                    );
                    instrumentTypeData = {
                        instrumentTypeId:
                            response.data.outBinds.instrument_type_id,
                        ...instrumentTypeData,
                    };
                    commit("addInstrumentType", instrumentTypeData);
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },
    async updateInstrumentType({ commit }, payload) {
        handleSuccessResponse();
        await Api()
            .put(
                `instrument-types/update-instrument-type/${payload.instrumentTypeId}`,
                payload
            )
            .then((response) => {
                if (response.status === 200) {
                    handleSuccessResponse(
                        response.status,
                        "Instrument Type Updated Successfully!",
                        "bg-success",
                        true
                    );
                    commit("updateInstrumentType", response.data);
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },
    async deleteInstrumentType({ commit }, { instrumentTypeId }) {
        handleSuccessResponse();
        await Api()
            .delete(
                `instrument-types/delete-instrument-type/${instrumentTypeId}`
            )
            .then((response) => {
                if (response.status === 200) {
                    commit("removeInstrumentType", { instrumentTypeId });
                    handleSuccessResponse(
                        response.status,
                        "Instrument Type Deleted Successfully!",
                        "bg-success",
                        true
                    );
                } else {
                    handleCatchError(null, response);
                }
            })
            .catch((error) => {
                handleCatchError(error, null);
            });
    },
};
