CREATE USER APP_ASIG_ESTUDIANTES IDENTIFIED BY oracle;
GRANT CONNECT,RESOURCE,dba TO APP_ASIG_ESTUDIANTES;
GRANT UNLIMITED TABLESPACE TO APP_ASIG_ESTUDIANTES;
ALTER PROFILE DEFAULT LIMIT PASSWORD_REUSE_TIME UNLIMITED;
ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;

ALTER SESSION SET CURRENT_SCHEMA=APP_ASIG_ESTUDIANTES;
ALTER USER APP_ASIG_ESTUDIANTES IDENTIFIED BY oracle;
@C:\Users\Public\ProyectoStudentSelection\BD\tables.SQL
@C:\Users\Public\ProyectoStudentSelection\BD\insert.SQL
@C:\Users\Public\ProyectoStudentSelection\BD\procedures.SQL
@C:\Users\Public\ProyectoStudentSelection\BD\INDEX\CANDIDATE.SQL