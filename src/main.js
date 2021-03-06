"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var node_fetch_1 = __importDefault(require("node-fetch"));
var apollo_server_1 = require("apollo-server");
var graphql_type_json_1 = __importDefault(require("graphql-type-json"));
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.\n  scalar JSON\n\n  type Item {\n    id: String\n    value: String\n    recommendations: [Item]\n    explanation: ItemExplanation\n    wiki: String\n  }\n\n  type ItemExplanation {\n    is_slotted: Boolean\n    computed_score: Int\n    conversion_rules_boost: Int\n    query_refinement_boost: Int\n    final_score: Int\n  }\n\n  type Facet {\n    name: String\n    display_name: String\n    data: JSON\n    options(limit: Int!, data: [String]): [FacetOption]\n  }\n\n  type FacetOption {\n    value: String\n    display_name: String\n    top_products(limit: Int!): [Item]\n  }\n\n  type Search {\n    query: String\n    items: [Item]\n    recommendations: [Item]\n  }\n\n  # The \"Query\" type is special: it lists all of the available queries that\n  # clients can execute, along with the return type for each. In this\n  # case, the \"books\" query returns an array of zero or more Books (defined above).\n  type Query {\n    facets(limit: Int!): [Facet]\n    search(query: String): Search\n  }\n"], ["\n  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.\n  scalar JSON\n\n  type Item {\n    id: String\n    value: String\n    recommendations: [Item]\n    explanation: ItemExplanation\n    wiki: String\n  }\n\n  type ItemExplanation {\n    is_slotted: Boolean\n    computed_score: Int\n    conversion_rules_boost: Int\n    query_refinement_boost: Int\n    final_score: Int\n  }\n\n  type Facet {\n    name: String\n    display_name: String\n    data: JSON\n    options(limit: Int!, data: [String]): [FacetOption]\n  }\n\n  type FacetOption {\n    value: String\n    display_name: String\n    top_products(limit: Int!): [Item]\n  }\n\n  type Search {\n    query: String\n    items: [Item]\n    recommendations: [Item]\n  }\n\n  # The \"Query\" type is special: it lists all of the available queries that\n  # clients can execute, along with the return type for each. In this\n  # case, the \"books\" query returns an array of zero or more Books (defined above).\n  type Query {\n    facets(limit: Int!): [Facet]\n    search(query: String): Search\n  }\n"])));
var resolvers = {
    JSON: graphql_type_json_1["default"],
    Query: {
        facets: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, node_fetch_1["default"]("https://ac.cnstrc.com/search/?key=u7PNVQx-prod-en-us")];
                    case 1: return [4 /*yield*/, (_a.sent()).json()];
                    case 2:
                        r = _a.sent();
                        return [2 /*return*/, r.response.facets.slice(0, args.limit)];
                }
            });
        }); },
        search: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, node_fetch_1["default"]("https://ac.cnstrc.com/search/" + args.query + "?key=u7PNVQx-prod-en-us&explain=True")];
                    case 1: return [4 /*yield*/, (_a.sent()).json()];
                    case 2:
                        r = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, r), { query: args.query })];
                }
            });
        }); }
    },
    Search: {
        recommendations: function (parent) { return __awaiter(void 0, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, node_fetch_1["default"]("https://ac.cnstrc.com/recommendations/v1/pods/zero_results_2?key=u7PNVQx-prod-en-us&query=" + parent.query)];
                    case 1: return [4 /*yield*/, (_a.sent()).json()];
                    case 2:
                        r = _a.sent();
                        return [2 /*return*/, r.response.results.slice(0, 3)];
                }
            });
        }); },
        items: function (parent) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("XXXX main.ts:83 ", parent);
                return [2 /*return*/, parent.response.results.slice(0, 3)];
            });
        }); }
    },
    Item: {
        id: function (parent) {
            return parent.data.id;
        },
        explanation: function (parent) {
            return __assign(__assign({}, parent.explanation), { is_slotted: parent.is_slotted });
        },
        recommendations: function (parent) { return __awaiter(void 0, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, node_fetch_1["default"]("https://ac.cnstrc.com/recommendations/v1/pods/cart_page_1?key=u7PNVQx-prod-en-us&item_id=" + parent.data.id)];
                    case 1: return [4 /*yield*/, (_a.sent()).json()];
                    case 2:
                        r = _a.sent();
                        return [2 /*return*/, r.response.results.slice(0, 3)];
                }
            });
        }); },
        wiki: function (parent) { return __awaiter(void 0, void 0, void 0, function () {
            var colorFamily, r;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        colorFamily = (((_a = parent.data.facets.find(function (facet) { return facet.name === 'Color Family'; })) === null || _a === void 0 ? void 0 : _a.values) || [])[0];
                        if (!colorFamily) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, node_fetch_1["default"]("https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=" + colorFamily)];
                    case 1: return [4 /*yield*/, (_c.sent()).json()];
                    case 2:
                        r = _c.sent();
                        return [2 /*return*/, (_b = Object.values(r.query.pages)[0]) === null || _b === void 0 ? void 0 : _b.extract];
                }
            });
        }); }
    },
    Facet: {
        options: function (parent, args) {
            console.log("XXXX main.ts:47 ", args);
            return (parent.options || [])
                .map(function (option) { return (__assign(__assign({}, option), { facet: parent })); })
                .slice(0, args.limit);
        }
    },
    FacetOption: {
        top_products: function (parent, args) {
            return __awaiter(this, void 0, void 0, function () {
                var r;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, node_fetch_1["default"]("https://ac.cnstrc.com/browse/" + parent.facet.name + "/" + parent.value + "?key=u7PNVQx-prod-en-us")];
                        case 1: return [4 /*yield*/, (_a.sent()).json()];
                        case 2:
                            r = _a.sent();
                            return [2 /*return*/, r.response.results.slice(0, args.limit).map(function (result) { return ({
                                    id: result.data.id,
                                    value: result.value
                                }); })];
                    }
                });
            });
        }
    }
};
var server = new apollo_server_1.ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
// The `listen` method launches a web server.
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
var templateObject_1;
