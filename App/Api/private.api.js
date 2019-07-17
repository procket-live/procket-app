import { Get, Post } from "../Utils/http.utils";
import { OFFERS, GAME, TOURNAMENT, LEADERBOARD, GAME_PROFILES, PROFILE, USER, GENERATE_OTP, VERIFY_OTP, PARTICIPATE, PAYEMENT, WALLET, ADD_AMOUNT, VERIFY_PAYMENT, TRANSACTIONS, SET_FIREBASE_TOKEN } from "../Constants/api.constants";

class PrivateApi {
    static offers(body) {
        return Get({ url: OFFERS, body, hideLoader: true });
    }

    static getGames() {
        return Get({ url: GAME, hideLoader: true })
    }

    static getGameDetail(id) {
        return Get({ url: `${GAME}/${id}` });
    }

    static getUpcomingTournaments(gameId, hideLoader = false, completed) {
        let url = TOURNAMENT;

        if (gameId) {
            if (!url.includes('?')) {
                url = `${url}?`;
            }

            url = `${url}game_id=${gameId}`;
        }

        if (completed == 1) {
            if (!url.includes('?')) {
                url = `${url}?`;
            }

            url = `${url}completed=1`;
        }

        return Get({ url, hideLoader })
    }

    static getTournamentDetail(id) {
        return Get({ url: `${TOURNAMENT}/${id}` });
    }

    static getLeaderboard() {
        return Get({ url: LEADERBOARD });
    }

    static getGameProfiles() {
        return Get({ url: GAME_PROFILES })
    }

    static createProfile(body) {
        return Post({ url: PROFILE, body })
    }

    static getUser() {
        return Get({ url: USER, hideLoader: true });
    }

    static generateOTP(body) {
        return Post({ url: GENERATE_OTP, body })
    }

    static verifyOTP(body) {
        return Post({ url: VERIFY_OTP, body });
    }

    static participateTournament(body) {
        return Post({ url: PARTICIPATE, body })
    }

    static getParticipation(id) {
        return Get({ url: `${PARTICIPATE}/${id}` });
    }

    static completeParticipation(id) {
        return Post({ url: `${PARTICIPATE}/${id}` })
    }

    static generatePaymentChecksum(body) {
        return Post({ url: PAYEMENT, body })
    }

    static getWallet() {
        return Get({ url: WALLET })
    }

    static addAmount(body) {
        return Post({ url: ADD_AMOUNT, body })
    }

    static verifyPayment(body) {
        return Post({ url: VERIFY_PAYMENT, body });
    }

    static getTransactions() {
        return Get({ url: TRANSACTIONS })
    }

    static setFirebaseToken(body) {
        return Post({ url: SET_FIREBASE_TOKEN, body, hideMessage: true })
    }
}

export default PrivateApi;