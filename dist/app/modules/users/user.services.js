"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const argon2 = __importStar(require("argon2"));
const config_1 = require("../../config/config");
const createToken_1 = require("../../utility/createToken");
const use_utility_1 = require("./use.utility");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    const _a = result.toObject(), { password } = _a, remaining = __rest(_a, ["password"]);
    return remaining;
});
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ username: payload.username }).select("+password");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "user not found");
    }
    const matchPass = yield argon2.verify(user.password, payload.password);
    if (!matchPass) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "password did not match");
    }
    const data = {
        username: user.username,
        email: user.email,
        role: user.role,
        name: user.name,
    };
    const accessToken = yield (0, createToken_1.createToken)(data, "1d");
    const refreshToken = yield (0, createToken_1.createToken)(data, "30d");
    return { accessToken, refreshToken };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    const decoded = (0, use_utility_1.verifyToken)(token, config_1.config.access_token_secrete);
    const { username } = decoded;
    // checking if the user is exist
    const user = yield user_model_1.User.findOne({ username: username });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is not found !");
    }
    const data = {
        username: user.username,
        email: user.email,
        role: user.role,
        name: user.name,
    };
    const accessToken = (0, createToken_1.createToken)(data, "30");
    return {
        accessToken,
    };
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
const getAllUserWithOutAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({ role: { $ne: "Admin" } });
    return result;
});
const getMe = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ username: payload });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "user not Found");
    }
    return result;
});
const updateRole = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ _id: payload.id });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "user not Found");
    }
    const result = yield user_model_1.User.findByIdAndUpdate({ _id: payload.id }, { role: payload.role });
    return result;
});
const getMemberShip = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ username: payload.username });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "user not Found");
    }
    if (user.isMember) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "User All ready member");
    }
    const result = yield user_model_1.User.findOneAndUpdate({ username: payload.username }, { isMember: true, points: 200 });
    return result;
});
exports.userServices = {
    createUserIntoDB,
    userLogin,
    refreshToken,
    getAllUserWithOutAdmin,
    updateRole,
    getMemberShip,
    getMe,
    getAllUsers
};
