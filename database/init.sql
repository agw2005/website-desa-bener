CREATE TABLE Aparatur (
    aparatur_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nama TEXT NOT NULL,
    jabatan TEXT NOT NULL,
    telepon TEXT,
    foto BYTEA,
    kata_sandi TEXT NOT NULL
);

CREATE TABLE Pelayanan (
    pelayanan_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    judul TEXT
);

CREATE TABLE Syarat_Pelayanan (
    syarat_pelayanan_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pelayanan_id INT,
    isi TEXT,
    tautan TEXT,

    CONSTRAINT syarat_dari_pelayanan 
        FOREIGN KEY (pelayanan_id) 
        REFERENCES Pelayanan(pelayanan_id) 
        ON DELETE CASCADE
);

CREATE TABLE Label (
    label_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nama TEXT NOT NULL
);

CREATE TABLE Artikel (
    artikel_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    judul TEXT NOT NULL,
    isi TEXT,
    waktu_upload BIGINT NOT NULL
);

CREATE TABLE Label_Artikel (
    artikel_id INT,
    label_id INT,

    CONSTRAINT artikel_dari_label 
        FOREIGN KEY (artikel_id) 
        REFERENCES Artikel(artikel_id) 
        ON DELETE CASCADE,

    CONSTRAINT label_dari_artikel 
        FOREIGN KEY (label_id) 
        REFERENCES Label(label_id) 
        ON DELETE CASCADE
);

CREATE TABLE Lampiran_Artikel (
    lampiran_artikel_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    artikel_id INT,
    nama_file TEXT NOT NULL,
    besar_file INT NOT NULL,
    isi_file BYTEA NOT NULL,

    CONSTRAINT artikel_dari_lampiran 
        FOREIGN KEY (artikel_id) 
        REFERENCES Artikel(artikel_id) 
        ON DELETE CASCADE
);

CREATE TABLE Dusun (
    dusun_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nama TEXT NOT NULL,
    rt INT,
    populasi INT,
    keluarga INT,
    laki INT,
    perempuan INT,
    umkm INT,
    islam INT,
    protestanisme INT,
    katolisisme INT,
    hinduisme INT,
    buddhisme INT,
    konfusianisme INT,
    tunadaksa INT,
    tunanetra INT,
    tunarungu INT,
    tunawicara INT,
    tunagrahita INT,
    tunalaras INT,
    kps INT,
    ks_satu INT,
    ks_dua INT,
    ks_tiga INT,
    ks_tiga_plus INT
);

-- 

CREATE TABLE Profil (
    profil_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    deskripsi_sekilas TEXT,
    kode_desa INT,
    kecamatan TEXT,
    kabupaten_kota TEXT,
    provinsi TEXT,
    tahun_pembentukan INT,
    luas DECIMAL,
    koordinat TEXT,
    tipologi TEXT,
    klasifikasi TEXT,
    kategori TEXT,
    batas_timur TEXT,
    batas_barat TEXT,
    batas_selatan TEXT,
    batas_utara TEXT,
    sejarah TEXT,
    peta BYTEA,
    tautan_kalender TEXT
);

CREATE TABLE Visi (
    visi_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    isi TEXT
);

CREATE TABLE Misi (
    misi_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    isi TEXT
);

CREATE TABLE Apbdes (
    apbdes_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tahun INT
);

CREATE TABLE Lampiran_Apbdes (
    apbdes_file_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    apbdes_id INT,
    nama_file TEXT,
    besar_file INT NOT NULL,
    isi_file BYTEA NOT NULL,

    CONSTRAINT lampiran_dari_apbdes 
        FOREIGN KEY (apbdes_id) 
        REFERENCES Apbdes(apbdes_id) 
        ON DELETE CASCADE
);

CREATE TABLE Wisata (
    wisata_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nama TEXT NOT NULL,
    deskripsi TEXT NOT NULL,
    foto BYTEA NOT NULL
);

CREATE TABLE Umkm (
    umkm_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nama TEXT NOT NULL,
    dusun_id INT,
    deskripsi TEXT NOT NULL,
    foto BYTEA NOT NULL,

    CONSTRAINT dusun_dari_umkm 
        FOREIGN KEY (dusun_id) 
        REFERENCES Dusun(dusun_id) 
        ON DELETE CASCADE
);

CREATE TABLE Kontak_Umkm (
    kontak_umkm_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    umkm_id INT,
    jenis_kontak TEXT,
    isi TEXT,
    tautan TEXT,

    CONSTRAINT umkm_dari_kontak 
        FOREIGN KEY (umkm_id) 
        REFERENCES Umkm(umkm_id) 
        ON DELETE CASCADE
);

CREATE TABLE Komentar (
    komentar_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nama TEXT NOT NULL,
    surel TEXT NOT NULL,
    isi TEXT NOT NULL,
    waktu_upload BIGINT NOT NULL
);

INSERT INTO Profil (
    deskripsi_sekilas,
    kode_desa,
    kecamatan,
    kabupaten_kota,
    provinsi,
    tahun_pembentukan,
    luas,
    koordinat,
    tipologi,
    klasifikasi,
    kategori,
    batas_timur,
    batas_barat,
    batas_selatan,
    batas_utara,
    sejarah,
    peta,
    tautan_kalender
) VALUES (
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
);

INSERT INTO Aparatur (
    nama,
    jabatan,
    kata_sandi
) VALUES (
    'Admin',
    'Admin',
    '1234567890'
);