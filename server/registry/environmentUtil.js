const EnvironmentUtil = {
	getMaxPoints() {
		return process.env.MAX_POINTS || 2500;
	},

	getDeckShuffleSeed() {
		return process.env.DECK_SHUFFLE_SEED || 42; // 0 for totally random shuffling, any other number for the same sequence of hands
	},

	getClientRequestTimeoutInMillis() {
		return process.env.CLIENT_REQUEST_TIMEOUT_IN_MILLIS || 5000; //normal: 500, high so that failures happen less often due to players exceeding request timeout
	},

	getTournamentLogging() {
		return Boolean(process.env.TOURNAMENT_LOGGING) || true;
	},

	getTournamentCounting() {
		return Boolean(process.env.TOURNAMENT_COUNTING) || false;
	},

	getTournamentRounds() {
		return process.env.TOURNAMENT_ROUNDS || 1;
	},

	getTournamentLoggingDir() {
		return process.env.TOURNAMENT_LOGGING_DIR || 'experiments';
	},

	getPort() {
		return process.env.PORT || 3000;
	},

	getDebug() {
		return Boolean(process.env.DEBUG) || false;
	},

	getPublicServerAddress() {
		return process.env.PUBLIC_SERVER_ADDRESS || 'ws://localhost:3000';
	},

	getRegistryAddress() {
		return process.env.REGISTRY_URL || 'http://localhost:3001/api';
	}
};


export default EnvironmentUtil;