print("Content-Type: text/json\n")
import sys
print(sys.version)

print(0,"<br>")
from   pandas import DataFrame as df
print(1,"<br>")
import pandas as pd
print(2,"<br>")
import numpy as np
print(3,"<br>")
from   sklearn import linear_model as lR
print(4,"<br>")
import mysql.connector
print(5,"<br>")
from sqlalchemy.types import NVARCHAR, Float, Integer
from sqlalchemy import create_engine
import sqlalchemy



#=================read Data=================#
db = mysql.connector.connect(host="localhost",user="g06", passwd="20181ncu_g06", db="g06_test")
cursor = db.cursor()

#cursor.execute("SELECT * FROM light ORDER BY time DESC LIMIT 50")
cursor.execute("SELECT * FROM temp_eat ")

results = cursor.fetchall()
#table_rows = df(results)
#test= df(results,columns=['id','value','status','time'])
data= df(results,columns=['id','temp','weight','time'])
print("==================got data from light====================")
print(data.info())
print(type(data))
print("==================test columns light====================")
print(data.columns)

sX=data["temp"]
ndX=np.array(sX)
ndX=ndX.reshape(-1,1)
sY=data["weight"]
ndY=np.array(sY).reshape(-1,1)
print(" shape of ndX,ndY=====")
print(ndX.shape,ndY.shape)


#=================read Data End=================#


model=lR.LinearRegression()
model.fit(ndX,ndY)

print(model)


cursor.execute("SELECT * FROM TodayTemp ")

results = cursor.fetchall()
#table_rows = df(results)
#test= df(results,columns=['id','value','status','time'])
data= df(results,columns=['temp','will_eat'])


#sA=table_rows[1]
#ndA=np.array(sA)

#ndA=ndA.reshape(-1,1)

#X=np.array(test['temp']).reshape(-1,1)
print("ffff")
print(float(data['temp']))

X_test=np.array(float(data['temp'])).reshape(-1,1)
Y=model.predict(X_test)

print(Y)
print("<br>")
print("Cat will Eat")
print(Y[0][0])
print("(g)food")


#cursor.execute("SELECT * FROM light ORDER BY time DESC LIMIT 50")
sql="UPDATE `TodayTemp` SET `will_eat`="
sql =sql+str(Y[0][0])
cursor.execute(sql)
db.commit()

db.close()
# print("==================X, Y shape ====================")
# print(X.shape,Y.shape)
# test['status']=Y


# print(test)



# host = '127.0.0.1'
# port = 3306
# db = 'g06_lightdb'
# table='light'
# user = 'g06'
# password = '20181ncu_g06'
# charset='utf8'

# #engine = create_engine("mysql+mysqldb://USER:"+'PASSWORD'+"@localhost/DATABASE")
# #engine = create_engine(str(r"mysql+mysqldb://%s:" + '%s' + "@%s/%s") % (user, password, host, db))
# engine = create_engine(str(r"mysql+pymysql://%s:" + '%s' + "@%s/%s") % (user, password, host, db))

# try:
#     '''
#     if_exists: {'fail', 'replace', 'append'}, default 'fail'
#      fail: If table exists, do nothing.
#      replace: If table exists, drop it, recreate it, and insert data.
#      append: If table exists, insert data. Create if does not exist.
#      '''
#     #df = pd.read_sql(sql=r'select * from city', con=engine)
#     #df.to_sql('test',con=engine,if_exists='append',index=False)
#     #df.to_sql(table,con=engine,if_exists='append',index=False)
#     test.to_sql(table,con=engine,if_exists='replace',index=False)
# except Exception as e:
#     print(e.message)

# print("Write to MariaDB finished~~~")

# #
# #
# #engine = create_engine('mysql://test123:test123@localhost/lightdb')
# #con = engine.connect()
# ##ndC.to_sql(name='test',con=db,if_exists='append',index=False)
# #
# ##ndC.to_sql(name='new_table', con=con, if_exists = 'append')
# #
# #
# #ndC.to_sql("light",con=db,flavor='mysql',if_exists='append')
# #ndC.to_csv("testing.csv",index=False,mode="w")
# #con.close()
# #
# ## pip install mysqlclient
# ##pip install mysql-python
