--
-- PostgreSQL database dump
--

\restrict fMsZDbzL9xdVEq4MMIVektwUIbeepjbz8didcLt5AIsWGW2aOpNTBjcW9IWUWAv

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-06-02 13:35:53

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16408)
-- Name: user_lists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_lists (
    id integer NOT NULL,
    user_id integer NOT NULL,
    anime_id integer NOT NULL,
    title text NOT NULL,
    cover_image text,
    status character varying(30) DEFAULT 'Watching'::character varying,
    rating integer DEFAULT 0,
    progress integer DEFAULT 0,
    favorite boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_lists OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16407)
-- Name: user_lists_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_lists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_lists_id_seq OWNER TO postgres;

--
-- TOC entry 5034 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_lists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_lists_id_seq OWNED BY public.user_lists.id;


--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5035 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4863 (class 2604 OID 16411)
-- Name: user_lists id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_lists ALTER COLUMN id SET DEFAULT nextval('public.user_lists_id_seq'::regclass);


--
-- TOC entry 4861 (class 2604 OID 16393)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5028 (class 0 OID 16408)
-- Dependencies: 222
-- Data for Name: user_lists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_lists (id, user_id, anime_id, title, cover_image, status, rating, progress, favorite, created_at) FROM stdin;
2	1	9253	Steins;Gate		Completed	10	21	t	2026-06-02 10:41:34.390677
\.


--
-- TOC entry 5026 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password_hash, created_at) FROM stdin;
1	arihant	arihant@test.com	$2b$10$3ud3uyQ4LEcMCVlk/hHyIuSFDUyEsTM6xJRvfsUHKbYSwuv0bAW1i	2026-06-01 16:57:52.808389
2	Arihant	jainfamily30@gmail.com	$2b$10$0tgS6xsX0ErbxO9flKmLWOuDZTiNG4ExZ8K/.m8QKYD7ONqsFzhOW	2026-06-02 10:29:35.954461
\.


--
-- TOC entry 5036 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_lists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_lists_id_seq', 2, true);


--
-- TOC entry 5037 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- TOC entry 4876 (class 2606 OID 16424)
-- Name: user_lists user_lists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_lists
    ADD CONSTRAINT user_lists_pkey PRIMARY KEY (id);


--
-- TOC entry 4870 (class 2606 OID 16406)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4872 (class 2606 OID 16402)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4874 (class 2606 OID 16404)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4877 (class 2606 OID 16425)
-- Name: user_lists user_lists_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_lists
    ADD CONSTRAINT user_lists_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2026-06-02 13:35:53

--
-- PostgreSQL database dump complete
--

\unrestrict fMsZDbzL9xdVEq4MMIVektwUIbeepjbz8didcLt5AIsWGW2aOpNTBjcW9IWUWAv

