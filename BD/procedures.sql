--------------------------------------------------------
-- Archivo creado  - viernes-diciembre-23-2022   
--------------------------------------------------------
create or replace PACKAGE LOAD_CANDIDATES IS
    PROCEDURE CREATE_CANDIDATES_FROM_FILE(FILE_NAME VARCHAR2);
END;
/
create or replace PACKAGE BODY LOAD_CANDIDATES IS
    USER_PRESENT EXCEPTION;
    PROCEDURE CREATE_CANDIDATES_FROM_FILE(FILE_NAME VARCHAR2) IS
        L_FILE UTL_FILE.FILE_TYPE;
        L_TEXT VARCHAR2(32767);
        L_CNT NUMBER;
        CANDIDATEID NUMBER :=0;
        COUNTCANDIDATE PLS_INTEGER :=0;
        BEGIN
            L_FILE := UTL_FILE.FOPEN('CANDIDATOS', FILE_NAME, 'R');

            LOOP
                UTL_FILE.GET_LINE(L_FILE, L_TEXT);
                -- L_TEXT CONTAINS THE WHOLE ROW; SPLIT IT (BY COMMAS) INTO 3 VALUES
                -- AND INSERT THEM INTO THE TEST2 TABLE
                SELECT COUNT (c.DOCUMENTNUMBER) INTO COUNTCANDIDATE FROM CANDIDATE c WHERE c.DOCUMENTNUMBER=REGEXP_SUBSTR(L_TEXT, '[^,]+', 1, 4);
                IF COUNTCANDIDATE=0 THEN
                    INSERT INTO CANDIDATE (NAME, SURNAME, BIRTHDAY, DOCUMENTNUMBER, DOCUMENTTYPE, EMAIL, CREATIONDATE, UPDATEDATE, ACTIVE)
                    VALUES (REGEXP_SUBSTR(L_TEXT, '[^,]+', 1, 1),
                            REGEXP_SUBSTR(L_TEXT, '[^,]+', 1, 2),
                            REGEXP_SUBSTR(L_TEXT, '[^,]+', 1, 3),
                            REGEXP_SUBSTR(L_TEXT, '[^,]+', 1, 4),
                            REGEXP_SUBSTR(L_TEXT, '[^,]+', 1, 5),
                            REGEXP_SUBSTR(L_TEXT, '[^,]+', 1, 6),
                            SYSDATE,
                            SYSDATE,
                            REGEXP_SUBSTR(L_TEXT, '[^,]+', 1, 7));
                    SELECT ID INTO CANDIDATEID FROM CANDIDATE WHERE DOCUMENTNUMBER= REGEXP_SUBSTR(L_TEXT, '[^,]+', 1, 4);
                    --RETURNING ID INTO CANDIDATEID;
                    INSERT INTO USER_INFORMATION (ANSWER,CANDIDATE ,CREATIONDATE,UPDATEDATE,ACTIVE) 
                    VALUES (REGEXP_SUBSTR(L_TEXT, '[^,]+', 1, 8),CANDIDATEID,SYSDATE,SYSDATE,1);
                    INSERT INTO USER_INFORMATION (ANSWER,CANDIDATE ,CREATIONDATE,UPDATEDATE,ACTIVE) 
                    VALUES (REGEXP_SUBSTR(L_TEXT, '[^,]+', 1, 9),CANDIDATEID,SYSDATE,SYSDATE,1);
                    INSERT INTO USER_INFORMATION (ANSWER,CANDIDATE ,CREATIONDATE,UPDATEDATE,ACTIVE) 
                    VALUES (REGEXP_SUBSTR(L_TEXT, '[^,]+', 1, 10),CANDIDATEID,SYSDATE,SYSDATE,1);
                    INSERT INTO USER_INFORMATION (ANSWER,CANDIDATE ,CREATIONDATE,UPDATEDATE,ACTIVE) 
                    VALUES (REGEXP_SUBSTR(L_TEXT, '[^,]+', 1, 11),CANDIDATEID,SYSDATE,SYSDATE,1);
                    INSERT INTO USER_INFORMATION (ANSWER,CANDIDATE ,CREATIONDATE,UPDATEDATE,ACTIVE) 
                    VALUES (REGEXP_SUBSTR(L_TEXT, '[^,]+', 1, 12),CANDIDATEID,SYSDATE,SYSDATE,1);
                    INSERT INTO USER_INFORMATION (ANSWER,CANDIDATE ,CREATIONDATE,UPDATEDATE,ACTIVE) 
                    VALUES (REGEXP_SUBSTR(L_TEXT, '[^,]+', 1, 13),CANDIDATEID,SYSDATE,SYSDATE,1);
                ELSE
                    RAISE USER_PRESENT;
                END IF;
          END LOOP;

          UTL_FILE.FCLOSE(L_FILE);

          EXCEPTION
            WHEN USER_PRESENT THEN
                RAISE_APPLICATION_ERROR(-20000,'User does already exist in db');
            WHEN OTHERS THEN
            NULL;
        END CREATE_CANDIDATES_FROM_FILE;
        

END ;